import React, { Component } from 'react'
import { Text, StyleSheet, Image, Dimensions, AsyncStorage, ToastAndroid } from 'react-native'
import { Container, Col, Row, Grid } from 'native-base'
import List from './list'
const { height, width } = Dimensions.get('window')


export default class SideBar extends Component {
  state = {
    username: '',
    email: ''
  }
  logOut = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('FirstPage');
      ToastAndroid.show('Succesfully log out!', ToastAndroid.SHORT);
    } catch (err) {
      alert(err)
    }
  }

  navigateTo = (path) => {
    this.props.navigation.navigate(path)
  }

  componentDidMount = async () => {
    try {
      const username = await AsyncStorage.getItem('name')
      const email = await AsyncStorage.getItem('email')
      this.setState({username, email})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Container style={style.bg}>
        <Grid>
          <Row style={{ height: height / 6, borderBottomColor: 'lightgrey', borderBottomWidth: 0.8 }}>
            <Image
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_boss_client_beard_male_person_user-512.png'
              }}
              style={style.avatar}
            />
            <Col style={{ justifyContent: 'center' }}>
              <Text style={style.greeting}>
                Hello, {this.state.username}
              </Text>
              <Text>
                {this.state.email}
              </Text>
            </Col>
          </Row>
          <List title="Home" iconName="home" action={() => this.navigateTo('HomePage')} />
          <List title="Schedule" iconName="clock" action={() => this.navigateTo('Schedule')} />
          <List title="Weather" iconName="cloud" action={() => this.navigateTo('Schedule')} />
          <List title="Logout" iconName="power" action={this.logOut} />
        </Grid>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
    height: '100%'
  },
  greeting: {
    fontSize: 20,
    color: 'black',
    marginHorizontal: 'auto'
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    padding: 15
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  }
})