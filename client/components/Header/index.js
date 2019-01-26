import React, { Component } from 'react';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' onPress={() => { this.props.openDrawer() }} />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
}