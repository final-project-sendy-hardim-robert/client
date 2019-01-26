import React, { Component } from 'react'
import { Col } from 'react-native-easy-grid';
import { Text, Body, Card, CardItem, Icon } from 'native-base';

export default class UserControl extends Component {
  render() {
    return (
      <Col style={{ height: 200, margin: 5 }} onPress={() => this.props.fn()}>
        <Card height="100%" style={{}}>
          <CardItem style={{ flex: 1, backgroundColor: this.props.color }}>
            <Body style={{ alignItems: 'center' }}>
              <Icon name={this.props.symbol}
                style={{ color: 'white', fontSize: 120, marginHorizontal: 'auto' }}
              />
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {this.props.description}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Col>
    )
  }
}