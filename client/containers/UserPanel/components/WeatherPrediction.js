import React, { Component } from 'react';
import { ToastAndroid, Text } from 'react-native';
import axios from 'axios';

class WeatherPrediction  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    console.log('masuk ga')
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
          .then((data) => {
            ToastAndroid.show(data, ToastAndroid.LONG)

          })
          .catch((err) => {
            ToastAndroid.show(err, ToastAndroid.LONG)
          })
      }
    }
  }

  render() { 
    return (
      <Text>Halo kuda dari sini</Text>
    );
  }
}
 
export default WeatherPrediction ;