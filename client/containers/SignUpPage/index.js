import React, { Component } from 'react';
import { Container, Button , Form, Item, Input, Label  } from 'native-base';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up Form</Text>
          <Form style={styles.paper}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
          <Button style={styles.button} block>
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
    fontWeight: '700', 
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 20
  },
  button: {
    marginTop: 20, 
    marginLeft: 10, 
    marginBottom: 10, 
    backgroundColor: '#0A6C74'
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