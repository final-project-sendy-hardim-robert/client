import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Icon, Container, Header, Col, Row, Grid } from 'native-base'

const { height, width } = Dimensions.get('window')

export default class List extends Component {
  render() {
    return (
      <Row style={{ height: height / 9, borderBottomColor: 'white', borderBottomWidth: 1 }} onPress={() => {alert('boi')}}>
        <Col style={{ width: '30%', justifyContent: 'center' }}>
          <Icon name={this.props.iconName} style={{ color: 'white', fontSize: 40, paddingHorizontal: 30 }} />
        </Col>
        <Col style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            {this.props.title}
          </Text>
        </Col>
      </Row>
    )
  }
}