import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignInPage from './containers/SignInPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';

const FirstPage = createStackNavigator({
    SignIn: SignInPage,
    SignUp: SignUpPage
}, {
  headerMode: 'none',
  initialRouteName: 'SignIn'
})

export default createAppContainer(FirstPage)