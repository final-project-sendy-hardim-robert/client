import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideDrawer from '../../components/Drawer';
import UserControl from './components/UserControl';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    return (
      <SideDrawer pageTitle="Home">
        <Grid style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Row style={{ height: height / 3 }}>
            <UserControl
              description="Hang it now"
              color="#F67280"
              fn={() => alert('boy')}
              symbol="shirt"
            />
            <UserControl
              description="Scheduler"
              color="#F8B195"
              fn={() => alert('boy')}
              symbol="timer"
            />
          </Row>
          <Row style={{}}>
            <UserControl
              description="Template box"
              color="#6C5B9C"
              fn={() => alert('boy')}
              symbol="cloud-circle"
            />
            <UserControl
              description="Hang it now"
              color="#C9718A"
              fn={() => alert('boy')}
              symbol="settings"
            />
          </Row>
        </Grid>
      </SideDrawer>
    );
  }
}