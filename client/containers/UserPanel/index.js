import React, { Component } from 'react';
import { Dimensions, AsyncStorage, View, Image, ScrollView, ToastAndroid } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Card, CardItem, Text, Body, Button } from "native-base";
import SideDrawer from '../../components/Drawer';
import UserControl from './components/UserControl';
import firebase from 'react-native-firebase';
import axios from 'axios';
import { weatherConditions } from './components/utils.js';
const { height, width } = Dimensions.get('window');

export default class Home extends Component {
  state = {
    hangNow: false,
    latitude: '',
    longitude: '',
    weatherData: [],
    currentWeather: {},
    suggestion: '',
  }

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('id');
      firebase.database().ref(`/Users/${userId}`).on('value', (snapshot, err) => {
        setTimeout(() => this.setState({
          hangNow: snapshot.val().hangNow
        }), 500)
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: 6.1805,
            longitude: 106.8283,
          })
        },
        (error) => ToastAndroid.show('Cannot get current location' + error.message, ToastAndroid.SHORT)),
        { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
    } catch (err) {
      alert(err);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevState.latitude !== this.state.latitude) {
        const { latitude, longitude } = this.state;
        const token = await AsyncStorage.getItem('token');
        const weathersData = await axios({
          method: 'get',
          url: `http://localhost:3000/weather?latitude=${latitude}&longitude=${longitude}`,
          headers: {
            token: token
          }
        })

        this.setState({
          weatherData: weathersData.data.data.slice(0, 8)
        })

        const currentWeather = await axios({
          method: 'get',
          url: `http://localhost:3000/weather/now?latitude=${latitude}&longitude=${longitude}`,
          headers: {
            token: token
          }
        })

        this.setState({
          currentWeather: currentWeather.data.data
        })

        return true
      }
    } catch (err) {
      console.log(err, 'sini ga coi')
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  goToWeatherPage = () => {
    this.props.navigation.navigate('WeatherPage');
  }

  goToSchedulePage = () => {
    this.props.navigation.navigate('Schedule');
  }

  hangNow = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (!this.state.hangNow) {
        await firebase.database().ref(`/Users/${userId}`).update({
          hangNow: true
        })

        this.setState({
          hangNow: !this.state.hangNow
        })
      } else {
        await firebase.database().ref(`/Users/${userId}`).update({
          hangNow: false
        })
        this.setState({
          hangNow: !this.state.hangNow
        })
      }
    } catch (err) {
      alert(err)
    }
  }

  saveSchedule = async (start, finish) => {
    const token = await AsyncStorage.getItem('token')
    axios({
      method: 'POST',
      url: 'http://localhost:3000/schedule',
      data: {
        start: start,
        finish: finish,
        active: false
      },
      headers: {
        token: token
      }
    }).then(({ data }) => {
      ToastAndroid.show('Schedule saved, activate the toggle immediately!', ToastAndroid.SHORT)
    })
    // .catch(err => {
    //   alert(JSON.stringify(err))
  }

  render() {
    const { weatherData, currentWeather } = this.state;
    let suggestion = ''
    let startRecomendation = ''
    let finishRecomendation = ''
    let today = new Date();

    if (weatherData.length > 0) {
      let nextData = [];
      let currentHour = new Date().getHours();
      let index = 0

      for (let i = 0; i < weatherData.length; i++) {
        let datahour = Number(weatherData[i]['dt_txt'].substring(11, 13))

        if (datahour === 0) {
          datahour = 24
        }

        if (datahour - Number(currentHour) >= 0) {
          nextData.push(weatherData[i])
          index += 1

          if (index === 2) {
            break
          }
        }
      }

      if (nextData[0].weather[0].main != 'Rain' && nextData[0].weather[0].main != 'Thunderstorm' && nextData[0].weather[0].main != 'Snow') {
        startRecomendation = today.getHours() + ":" + (today.getMinutes() + 2)
      }
      if (nextData[1].weather[0].main != 'Rain' && nextData[0].weather[0].main != 'Thunderstorm' && nextData[0].weather[0].main != 'Snow') {
        if (today.getHours() + 4 < 23) {
          finishRecomendation = (today.getHours() + 4) + ":" + today.getMinutes()
        }
      }


      suggestion = weatherConditions[nextData[0].weather[0].main].subtitle
    }

    return (
      <SideDrawer pageTitle="Home" navigation={this.props.navigation}>
        <ScrollView>
          {Object.keys(currentWeather).length > 0 &&
            <Card>
              <CardItem header bordered style={{ backgroundColor: '#18A999', borderColor: 'white' }}>
                <Text style={{ color: 'white' }}>Current Weather</Text>
              </CardItem>
              <CardItem bordered style={{ backgroundColor: '#18A999' }}>
                <Body>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Image
                      source={{ uri: `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png` }}
                      style={{ height: 80, width: 80 }}
                    />
                    <Text style={{ fontSize: 48, color: 'white' }}>{Math.floor(currentWeather.main.temp)}˚C</Text>
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{(currentWeather.weather[0].description)}</Text>
                  <Text style={{ fontStyle: 'italic', color: 'white' }}>{suggestion}</Text>
                  {
                    startRecomendation && finishRecomendation
                      ? <View>
                        <Text>Start: {startRecomendation} Finish: {finishRecomendation}</Text>
                        <Button
                          rounded
                          onPress={() => { this.saveSchedule(startRecomendation, finishRecomendation) }}
                          style={{ backgroundColor: '#0072BB' }}
                        >
                          <Text>Save Schedule</Text>
                        </Button>
                      </View>
                      : null
                  }
                </Body>
              </CardItem>
            </Card>
          }
          <Grid style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Row style={{ height: height / 3 }}>
              <UserControl
                description="Weather"
                color="#6C5B9C"
                fn={this.goToWeatherPage}
                symbol="cloud-circle"
              />
              <UserControl
                description="Scheduler"
                color="#F8B195"
                fn={this.goToSchedulePage}
                symbol="timer"
              />
            </Row>
            <Row style={{}}>
              <UserControl
                description={!this.state.hangNow ? "Hang it now" : "Take it down"}
                color="#F67280"
                fn={this.hangNow}
                symbol="shirt"
              />
            </Row>
          </Grid>
        </ScrollView>
      </SideDrawer>
    );
  }
}