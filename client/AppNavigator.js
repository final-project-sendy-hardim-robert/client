import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignInPage from './containers/SignInPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';
import HomePage from './containers/UserPanel/index.js';
import AuthLoading from './components/AuthLoading/index.js';

const FirstPage = createStackNavigator({
    SignIn: SignInPage,
    SignUp: SignUpPage,
}, {
  headerMode: 'none',
  initialRouteName: 'SignIn'
})

const Home = createStackNavigator({
  HomePage: HomePage
}, {
  headerMode: 'none',
  initialRouteName: 'HomePage'
})


export default createAppContainer(createSwitchNavigator({
  FirstPage: FirstPage,
  HomePage: Home,
  AuthLoading: AuthLoading  
}, {
  initialRouteName: 'AuthLoading'
}))