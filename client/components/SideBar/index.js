import React, { Component } from 'react'
import { Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Container, Col, Row, Grid } from 'native-base'
import List from './list'
const { height, width } = Dimensions.get('window')


export default class SideBar extends Component {
  render() {
    return (
      <Container style={style.bg}>
        <Grid>
          <Row style={{ height: height / 6, borderBottomColor: 'white', borderBottomWidth: 1 }}>
            <Image
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_boss_client_beard_male_person_user-512.png'
              }}
              style={style.avatar}
            />
            <Col style={{ justifyContent: 'center' }}>
              <Text style={style.greeting}>
                Hallo, username
              </Text>
            </Col>
          </Row>
          <List title="Home" iconName="home" />
          <List title="Status" iconName="umbrella" />
          <List title="Notification" iconName="notifications" />
          <List title="Schedule" iconName="clock" />
          <List title="Logout" iconName="power" />
        </Grid>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  bg: {
    backgroundColor: '#4893D8',
    height: '100%'
  },
  greeting: {
    fontSize: 20,
    color: 'white',
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