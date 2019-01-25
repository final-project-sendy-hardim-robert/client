import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Icon, Container, Header, Col, Row, Grid } from 'native-base'
import List from './list'
const { height, width } = Dimensions.get('window')


export default class SideBar extends Component {
  render() {
    return (
      // <View style={style.bg}>
      //   <View style={style.header}>
      //     <Image
      //       source={{
      //         uri: 'https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_boss_client_beard_male_person_user-512.png'
      //       }}
      //       style={style.avatar}
      //     />
      //     <Text style={style.greeting}>
      //       Hallo, username
      //     </Text>
      //   </View>
      // </View>
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
          {/* <Row style={{  height: height / 9 }}>
            <Col style={{ width: '30%', justifyContent: 'center' }}>
              <Icon name='home' style={{  color: 'white', fontSize: 40, paddingHorizontal: 30 }} />
            </Col>
            <Col style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 20}}>
                Home
            </Text>
            </Col>
          </Row> */}
          <List title="Home" iconName="home"/>
          <List title="Status" iconName="umbrella"/>
          <List title="Notification" iconName="notifications"/>
          <List title="Schedule" iconName="clock"/>
          <List title="Logout" iconName="power"/>
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