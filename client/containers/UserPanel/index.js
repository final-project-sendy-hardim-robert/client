import React, { Component } from 'react';
import { Drawer, Container, Header } from 'native-base';
import { TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SideBar from '../../components/SideBar';
export default class DrawerExample extends Component {
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
          <Header />
          <Grid>
            <Col onPress={() => { this.openDrawer() }} style={{ backgroundColor: '#635DB7', height: 200 }}> 
            </Col>
            <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
          </Grid>
        </Container>
      </Drawer>
    );
  }
}