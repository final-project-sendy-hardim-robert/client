import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Icon, Container, Header, Col, Row, Grid } from 'native-base'

const { height, width } = Dimensions.get('window')

class List extends Component {
  activePage() {
    if (this.props.navigation.state.routeName === 'HomePage' && this.props.title === 'Home') return 'black'
    else if (this.props.navigation.state.routeName === 'Schedule' && this.props.title === 'Schedule') return 'black'
    else if (this.props.navigation.state.routeName === 'WeatherPage' && this.props.title === 'Weather') return 'black'
    else return 'grey'

  }
  render() {
    return (
      <Row style={{ height: height / 12 }} onPress={this.props.action}>
        <Col style={{ width: '30%', justifyContent: 'center' }}>
          <Icon name={this.props.iconName} style={{ color: `${this.activePage()}`, fontSize: 25, paddingHorizontal: 30 }} />
        </Col>
        <Col style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ color: `${this.activePage()}`, fontSize: 16 }}>
            {this.props.title} {this.props.navigateTo}
          </Text>
        </Col>
      </Row>
    )
  }
}

export default withNavigation(List)