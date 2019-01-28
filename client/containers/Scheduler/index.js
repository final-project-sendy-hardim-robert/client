import React, { Component } from 'react';
import { Dimensions, TimePickerAndroid, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideDrawer from '../../components/Drawer';
import axios from 'axios';
const { height, width } = Dimensions.get('window');

export default class Scheduler extends Component {
  state = {
    start: 10,
    finish: 18
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/schedule',
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGhpbWFzaGFyeSIsImVtYWlsIjoiZGhpbWFzLmhhcnlAZ21haWwuY29tIiwiaWF0IjoxNTQ4NjAxNTU3fQ.hqkeIgq8USxEifPfdibp49Tf9jpb-2Z0N5nllXxoKNg'
      }
    })
      .then(({ data }) => {
        this.setState({
          start: data.startTime,
          finish: data.finishTime
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  saveSchedule = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        axios({
          method: 'POST',
          url: 'http://localhost:3000/schedule',
          data: {
            start: this.state.start,
            finish: this.state.finish
          },
          headers: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGhpbWFzaGFyIiwiZW1haWwiOiJkaGltYXMuaGFyQGdtYWlsLmNvbSIsImlhdCI6MTU0ODYwNzM1M30.hkTBD1kPBe1u1S95ccHFpKXHd3yOeGwX4TIvFUEIjG4'
          }
        }).then(({ data }) => {
          alert('done')
        })
          .catch(err => {
            alert(JSON.stringify(err))
            //alert('fail')
          })
        //alert(value);
        //return value
      } else {
        alert('please login first')
      }
    } catch (err) {
      console.log(err)
    }
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

  render() {
    return (
      <SideDrawer pageTitle="Scheduler">
        <Content style={{}}>
          <Text>Current Schedule: </Text>
          <Text>Start : {this.state.start} </Text>
          <Text>Finish : {this.state.finish} </Text>
          <View style={{ padding: 15 }}>
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
              style={{ padding: 15 }}
            >
              <Text>Save Schedule</Text>
            </Button>
          </View>
          <Text style={{ paddingVertical: 10, paddingLeft: 10, fontSize: 18 }}> Run Scheduler for : </Text>
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
          </ListItem>
        </Content>

      </SideDrawer>
    )
  }
}