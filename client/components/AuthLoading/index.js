import React, { PureComponent } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
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
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
 
export default AuthLoading;