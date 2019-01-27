import React, { PureComponent } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
class AuthLoading extends PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'HomePage': 'FirstPage')
  }

  render() { 
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }
}
 
export default AuthLoading;