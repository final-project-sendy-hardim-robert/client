import React, { Component } from 'react';
import { Dimensions, TimePickerAndroid, View, AsyncStorage, Switch } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button } from 'native-base';
import SideDrawer from '../../components/Drawer';
import axios from 'axios';
import { withNavigation } from 'react-navigation'
const { height, width } = Dimensions.get('window');

class Scheduler extends Component {
  state = {
    start: 10,
    finish: 17,
    token: '',
    active: false
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      alert(value)
      if (value) {
        alert('boi', JSON.stringify(value))
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

      } else {
        alert('please login first')
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
    })
      .catch(err => {
      })
  }

  pickHangTime = async (param) => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 10,
        minute: 0,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        param === 'start'
          ? this.setState({
            start: `${hour}:${minute}`
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
        alert(data)
      })
      .catch(err => {
        console.log(err)
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
        alert(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <SideDrawer pageTitle="Scheduler" navigation={this.props.navigation}>
        <Content style={{}}>
          <View style={{ padding: 15 }}>
            <Text>Current Schedule: </Text>
            <Text>Start : {this.state.start} </Text>
            <Text>Finish : {this.state.finish} </Text>
            <View style={{ marginVertical: 20, flexDirection: 'row' }}>
              <Text style={{
                marginRight: 50,
                fontSize: 20
              }}>
                Active :
            </Text>
              <Switch
                trackColor={{
                  false: 'grey',
                  true: 'green'
                }}
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], marginRight: 'auto' }}
                onValueChange={() => {
                  let active = this.state.active
                  this.setState({
                    active: !active
                  }, () => {
                    this.state.active
                      ? this.turnOnSchedule()
                      : this.turnOffSchedule()
                  })
                }}
                value={
                  this.state.active
                }
              />
            </View>
            <Text style={{ paddingVertical: 10, fontSize: 18 }}>Hang Clothes At: </Text>
            <Button
              onPress={() => { this.pickHangTime('start') }}
            >
              <Text>Pick Time </Text>
            </Button>
            <Text style={{ paddingVertical: 10, fontSize: 18 }}>Collect Clothes At: </Text>
            <Button
              onPress={() => { this.pickHangTime('finish') }}
            >
              <Text>Pick Time </Text>
            </Button>
            <Button
              onPress={() => { this.saveSchedule() }}
              style={{ padding: 15, marginVertical: 20 }}
            >
              <Text>Save Schedule</Text>
            </Button>
          </View>
          {/* <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 18 }}> Run Scheduler for : </Text>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text style={{ fontSize: 14 }}>Today</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Sunday</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Monday</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Tuesday</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Wednesday</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Thursday</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Friday</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text style={{ fontSize: 14 }}>Saturday</Text>
            </Body>
            <Body></Body>
          </ListItem> */}
        </Content>

      </SideDrawer>
    )
  }
}

export default withNavigation(Scheduler)