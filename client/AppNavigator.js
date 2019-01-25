import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignInPage from './containers/SignInPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';
import HomePage from './containers/UserPanel/index.js';

const FirstPage = createStackNavigator({
    SignIn: SignInPage,
    SignUp: SignUpPage,
    HomePage: HomePage 
}, {
  headerMode: 'none',
  initialRouteName: 'SignIn'
})

export default createAppContainer(FirstPage)