import React, { Component } from 'react';
import { Container, Button , Form, Item, Input, Label, Content } from 'native-base';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  moveToSignUp = () => {
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
        <Text style={styles.title}>Sign In Form</Text>
          <Form style={styles.paper}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                onChangeText={this.setOnChangedEmail}
                autoCapitalize='none'
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
                secureTextEntry={true}
                autoCapitalize='none'
                onChangeText={this.setOnChangedPassword}
              />
            </Item>
            <Button style={styles.button} 
              onPress={this.signIn}
              block
            >
              <Text style={{ color: '#D9E2EC'}}>Sign In</Text>
            </Button>
            <Button style={styles.button} 
              block
              onPress={this.moveToSignUp}
            >
              <Text style={{ marginLeft: 10, color: '#D9E2EC' }}>Sign Up</Text>
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
    marginTop: 20, 
    marginLeft: 10, 
    marginBottom: 10, 
    backgroundColor: '#0A6C74'
  },

  title: {
    fontWeight: '700', 
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 20
  },

  paper: {
    paddingRight: 10,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    paddingBottom: 20,
    backgroundColor: 'white'
  }
})

export default SignInPage;