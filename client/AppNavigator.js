import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignInPage from './containers/SignInPage/index.js';
import SignUpPage from './containers/SignUpPage/index.js';
import HomePage from './containers/UserPanel/index.js';
import AuthLoading from './components/AuthLoading/index.js';
import Scheduler from './containers/Scheduler/index.js';
import WeatherPage from './containers/WeatherPage/index.js';

const FirstPage = createStackNavigator({
  SignIn: SignInPage,
  SignUp: SignUpPage,
  HomePage: HomePage
}, {
    headerMode: 'none',
    initialRouteName: 'SignIn'
  })

const Home = createStackNavigator({
  HomePage: HomePage,
  Schedule: Scheduler,
  WeatherPage: WeatherPage
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