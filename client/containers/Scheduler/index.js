import React, { Component } from 'react';
import { Dimensions, TimePickerAndroid, View, AsyncStorage, Switch, StyleSheet, ToastAndroid } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button } from 'native-base';
import SideDrawer from '../../components/Drawer';
import axios from 'axios';
import moment from 'moment';
import { withNavigation } from 'react-navigation'
const { height, width } = Dimensions.get('window');

class Scheduler extends Component {
  state = {
    start: '',
    finish: '',
    token: '',
    formattedTime: '',
    active: false
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/schedule',
          headers: {
            token: value
          }
        })

      if (data) {
        this.setState({
          start: data.startTime,
          finish: data.finishTime,
          active: data.active,
          token: value
        })
      } else {
        this.setState({
          ...this.state,
          token: value
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  saveSchedule = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/schedule',
      data: {
        start: this.state.start,
        finish: this.state.finish,
        active: this.state.active
      },
      headers: {
        token: this.state.token
      }
    }).then(({ data }) => {
      this.setState({
        ...this.state,
        active: false
      })
      ToastAndroid.show('Schedule saved, activate the toggle immediately!', ToastAndroid.SHORT)
    })
      .catch(err => {
        alert('Something happened! Please try again !')
      })
  }

  pickHangTime = async (param) => {
    try {
      const date = new Date();
      const currentHour = date.getHours();
      const currentMinutes = date.getMinutes();
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: currentHour,
        minute: currentMinutes,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        if (param === start) {}
        param === 'start'
          ? this.setState({
            start: `${hour}:${minute}`,
          })
          : this.setState({
            finish: `${hour}:${minute}`
          })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  turnOnSchedule = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/schedule/start',
      headers: {
        token: this.state.token
      }
    })
      .then(({ data }) => {
      })
      .catch(err => {
        alert('Something happened! Please try again !')
      })
  }

  turnOffSchedule = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/schedule/finish',
      headers: {
        token: this.state.token
      }
    })
      .then(({ data }) => {
      })
      .catch(err => {
        alert('Something happened! Please try again !')
      })
  }

  render() {
    return (
      <SideDrawer pageTitle="Daily Schedule" navigation={this.props.navigation}>
        <Content>
          <View>
            <View style={{ marginHorizontal: 30, marginTop: 30, marginBottom: 70, flexDirection: 'row', borderColor: 'lightgrey', borderWidth: 1, padding: 15, borderRadius: 30, backgroundColor: 'lightgrey'}}>
              <View style={{flex: 3, alignItems: 'flex-start'}}>
                <Text style={{
                    marginRight: 50,
                    fontSize: 20,
                    color: 'grey'
                  }}>
                  Active :
                </Text>
              </View>
              <View style={{flex: 3, alignItems: 'flex-end'}}>
                <Switch
                  trackColor={{
                    false: 'grey',
                    true: 'green'
                  }}
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  onValueChange={() => {
                    let active = this.state.active
                    this.setState({
                      active: !active
                    }, () => {
                      if(this.state.active) {
                        this.turnOnSchedule()
                        ToastAndroid.show('Schedule activated', ToastAndroid.SHORT)
                      } else {
                        this.turnOffSchedule()
                        ToastAndroid.show('Schedule off', ToastAndroid.SHORT)
                      }
                    })
                  }}
                  value={
                    this.state.active
                  }
                />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.start}>Hang clothes at</Text>
              <Text style={styles.start}>Collect clothes at</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.time}>{this.state.start.length > 0 && moment(this.state.start, 'HH:m').format('HH:mm')} </Text>
              <Text style={styles.time}>{this.state.finish.length > 0 && moment(this.state.finish, 'HH:m').format('HH:mm')} </Text>
            </View>
            <View style={styles.container}>
             <View style={styles.button}>
              <View>
                  <Button
                    rounded
                    onPress={() => { this.pickHangTime('start') }}
                    style={{backgroundColor: '#0072BB'}}
                  >
                    <Text>Pick Time </Text>
                  </Button>
              </View>
             </View>
             <View style={styles.button}>
                <View>
                  <Button
                  rounded
                  onPress={() => { this.pickHangTime('finish') }}
                  style={{backgroundColor: '#0072BB'}}
                  >
                    <Text>Pick Time </Text>
                  </Button>
                </View>
             </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
              <View style={{}}>
                <Button
                  rounded
                  onPress={() => { this.saveSchedule() }}
                  style={{ paddingHorizontal: 85, paddingVertical: 30, backgroundColor: '#09901A' }}
                >
                  <Text>Save Schedule</Text>
                </Button>
              </View>
            </View>
          </View>
        </Content>
      </SideDrawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    flex: 3,
    alignItems: 'center',
    marginTop: 10
  },
  start: {
    flex: 3,
    textAlign: 'center',
    color: 'grey'
  },
  time: {
    flex: 3,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold'
  }
})

export default withNavigation(Scheduler)