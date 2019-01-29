import React, { Component } from 'react';
import { ToastAndroid, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { weatherConditions } from './utils.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import moment from 'moment';

class WeatherPage  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      weatherData: []
    }
  }

  componentDidMount() {
    const fullGMTFromMoment = moment().format().substring(moment().format().indexOf('+'))
    const GMTNumber = Number(fullGMTFromMoment.substring(0, 3));
    const date = new Date('UTC');
    console.log(date, 'test')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
    },
    (error) => ToastAndroid.show('Cannot get current location' + error.message, ToastAndroid.SHORT)),
    { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const { latitude, longitude } = this.state;
      if (latitude !== null && longitude !== null) {
        axios({
          method: 'get',
          url: `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=d17c75afa0e44ed8fb16e111c94383e9`
        })
          .then(({ data }) => {
           this.setState({
             weatherData: data.list
           })
          })
          .catch((err) => {
            ToastAndroid.show(err, ToastAndroid.LONG)
          })
      }
    }
  }

  render() { 
    return (
      <Container style={styles.container}>
       <Content padder>
      {this.state.weatherData.map((datum) => {
        return (
          <Card>
            <CardItem header bordered>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Image
                    source={ {uri: `http://openweathermap.org/img/w/${datum.weather[0].icon}.png`}}
                    style={{height: 70, width: 70}}
                  />
                <Text>{(datum.weather[0].description)}</Text>
              </Body>
            </CardItem>
          </Card>
        )
      })
      }
      
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})
 
export default WeatherPage ;