import React, { Component } from 'react';
import { Drawer, Container, Header } from 'native-base';
import SideBar from '../SideBar'
import CustomHeader from '../Header'

export default class SideDrawer extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <CustomHeader
            title={this.props.pageTitle}
            openDrawer={this.openDrawer.bind('this')}
          />
          {this.props.children}
        </Container>
      </Drawer>
    );
  }
}