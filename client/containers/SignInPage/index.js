import React, { Component } from 'react';
import { Container, Button , Form, Item, Input, Label } from 'native-base';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';
import axios from 'axios';
import firebase from 'react-native-firebase';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  moveToSignUp = () => {
    firebase.database().ref('/Users').push({
      message: 'halo firebase'
    })

    this.props.navigation.navigate('SignUp');
  }

  setOnChangedEmail = (text) => {
    this.setState({
      email: text
    })
  }

  setOnChangedPassword= (text) => {
    this.setState({
      password: text
    })
  }

  signIn =  async () => {
    try {
      const {data}  =  await axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: this.state.email,
          password: this.state.password
        }
      })

      const snapshot = await firebase.database().ref(`/Users/${data.user.id}`).set({
          hangNow: false 
      })

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('email', data.user.email);
      await AsyncStorage.setItem('name', data.user.name);
      await AsyncStorage.setItem('id', data.user.id);
      this.props.navigation.navigate('HomePage');
    } catch(err) {
      alert(err)
    }
  }

  render() { 
    return (
      <View style={styles.container}>
        <Image
          style={{width: 230, height: 90, alignSelf: 'center', marginBottom: 20}}
          source={{uri: "https://dewey.tailorbrands.com/production/brand_version_mockup_image/936/1632464936_c1cf6ed2-7b8f-4b14-aa8e-b6551add626f.png?cb=1548736167"}}
        />
          <Form>
            <Item rounded style={{backgroundColor: 'white'}}>
              <Input 
                onChangeText={this.setOnChangedEmail}
                placeholder="user@mail.com"
                autoCapitalize='none'
              />
            </Item>
            <Item rounded style={{marginBottom: 8, backgroundColor: 'white'}}>
              <Input 
                secureTextEntry={true}
                autoCapitalize='none'
                placeholder="myPass123!@#"
                onChangeText={this.setOnChangedPassword}
              />
            </Item>
            <Button rounded style={styles.button} 
              onPress={this.signIn}
              block
            >
              <Text style={{ color: '#D9E2EC'}}>Sign In</Text>
            </Button>
            <Button rounded style={{marginTop: 4, backgroundColor: '#09901A'}}
              block
              onPress={this.moveToSignUp}
            >
              <Text style={{ color: '#D9E2EC' }}>Sign Up</Text>
            </Button>
        </Form>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 'auto',
    backgroundColor: '#EEEEF4',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 100,
    paddingBottom: 240
  },
  
  button: {
    marginTop: 10, 
    backgroundColor: '#0072BB'
  },

  title: {
    fontWeight: 'bold', 
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 10
  },

  paper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    backgroundColor: 'white'
  }
})

export default SignInPage;