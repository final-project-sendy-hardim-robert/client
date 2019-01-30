import React, { Component } from 'react';
import { Container, Button , Form, Item, Input, Label  } from 'native-base';
import { StyleSheet, View, Text, KeyboardAvoidingView, Image } from 'react-native';
import axios from 'axios';


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  signUp = async () => {
    try {
      const { data } =  await axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      })

      this.props.navigation.navigate('SignIn');
    } catch (err) {
      alert('Something happened! Please try again !')
      }
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

  setOnChangedName = (text) => {
    this.setState({
      name: text
    })
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
                onChangeText={this.setOnChangedName}
                autoCapitalize="none"
                placeholder="Name"
              />
            </Item>
            <Item rounded style={{backgroundColor: 'white'}}>
              <Input 
                onChangeText={this.setOnChangedEmail} 
                autoCapitalize="none"
                placeholder="Email address"
              />
            </Item>
            <Item rounded style={{backgroundColor: 'white'}}>
              <Input 
                onChangeText={this.setOnChangedPassword} 
                secureTextEntry={true} 
                placeholder="Password"
              />
            </Item>
          <Button style={styles.button} block rounded onPress={this.signUp}>
            <Text style={{ color: '#D9E2EC'}}>Sign Up</Text>
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

  title: {
    fontWeight: '300', 
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 20
  },
  button: {
    marginTop: 20, 
    backgroundColor: '#09901A'
  },

  paper: {
    paddingRight: 10,
    borderRadius: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    backgroundColor: 'white'
  }
})

export default SignUpPage;