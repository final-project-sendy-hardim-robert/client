import React, { Component } from 'react';
import { ToastAndroid, StyleSheet, Image, AsyncStorage, View } from 'react-native';
import axios from 'axios';
import { Container, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import moment from 'moment';
import SideDrawer from '../../components/Drawer';

class WeatherPage  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      weatherData: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
    },
    (error) => ToastAndroid.show('Cannot get current location' + error.message, ToastAndroid.SHORT)),
    { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevState.latitude !== this.state.latitude) {
        const { latitude, longitude } = this.state;
        AsyncStorage.getItem('token')
          .then((data) => {
            const token = data;
            if (latitude !== null && longitude !== null) {
              return axios({
                method: 'get',
                url: `http://localhost:3000/weather?latitude=${latitude}&longitude=${longitude}`,
                headers: {
                  token: token
                }
              })
            }
          })
          .then(({data: { data }}) => {
            this.setState({
              weatherData: data.slice(0, 8)
              })
          })
          .catch((err) => {
            
          })
    }
  }

  render() { 
    return (
      <SideDrawer pageTitle="Today Weather Forecast" navigation={this.props.navigation}>
        <Container style={styles.container}>
          <Content padder>
            {this.state.weatherData.map((datum, index) => {
              return (
                <Card key={index}>
                  <CardItem header bordered style={{ backgroundColor: '#18A999', borderColor: 'white' }}>
                      <Text style={{color: 'white'}}><Icon name="clock" style={{color: 'white'}} /> {' '+ moment(datum['dt_txt']).format('HH:mm')}</Text>
                    </CardItem>
                  <CardItem bordered style={{ backgroundColor: '#18A999', borderColor: 'white' }}>
                    <Body>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Image
                            source={ {uri: `http://openweathermap.org/img/w/${datum.weather[0].icon}.png`}}
                            style={{height: 70, width: 70}}
                        />
                        <Text style={{ fontSize: 48, color: 'white' }}>{Math.floor(datum.main.temp)}˚C</Text>
                      </View>
                      <Text style={{color: 'white', fontSize: 18}}>{(datum.weather[0].description)}</Text>
                    </Body>
                  </CardItem>
                </Card>
              )
            })
            }
          </Content>
        </Container>
      </SideDrawer>
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