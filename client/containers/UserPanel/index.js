import React, { Component } from 'react';
import { Dimensions, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideDrawer from '../../components/Drawer';
import UserControl from './components/UserControl';
import firebase from 'react-native-firebase';
//import WeatherPrediction from './components/WeatherPrediction.js';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {

  state = {
    hangNow: false
  }

  async componentDidMount() {
    console.log('kuda')
    try {
      const userId = await AsyncStorage.getItem('id');
      firebase.database().ref(`/Users/${userId}`).on('value', (snapshot, err) => {
        setTimeout(() => this.setState({
          hangNow: snapshot.val().hangNow
        }), 100)      
      })
    } catch(err) {
      alert(err);
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

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
    } catch(err) {
      alert(err)
    }
  }

  render() {
    console.log(this.state.hangNow, 'masa berubah 2x');
    return (
      <SideDrawer pageTitle="Home" navigation={this.props.navigation}>
        <Grid style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Row style={{ height: height / 3 }}>
            <UserControl
              description={!this.state.hangNow ? "Hang it now" : "Take it down"}
              color="#F67280"
              fn={this.hangNow}
              symbol="shirt"
            />
            <UserControl
              description="Scheduler"
              color="#F8B195"
              fn={() => alert('boy')}
              symbol="timer"
            />
          </Row>
          <Row style={{}}>
            <UserControl
              description="Template box"
              color="#6C5B9C"
              fn={() => alert('boy')}
              symbol="cloud-circle"
            />
            <UserControl
              description="Hang it now"
              color="#C9718A"
              fn={() => alert('boy')}
              symbol="settings"
            />
          </Row>
        </Grid>
      </SideDrawer>
    );
  }
}