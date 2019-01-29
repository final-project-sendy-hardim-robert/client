import React, { Component } from 'react';
import { Dimensions, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideDrawer from '../../components/Drawer';
import UserControl from './components/UserControl';
import firebase from 'react-native-firebase';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {

  state = {
    hangNow: false
  }

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('id');
      firebase.database().ref(`/Users/${userId}`).on('value', (snapshot, err) => {
        setTimeout(() => this.setState({
          hangNow: snapshot.val().hangNow
        }), 500)      
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
    } catch(err) {
      alert(err)
    }
  }

  render() {
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
              fn={this.goToSchedulePage}
              symbol="timer"
            />
          </Row>
          <Row style={{}}>
            <UserControl
              description="Weather"
              color="#6C5B9C"
              fn={this.goToWeatherPage}
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