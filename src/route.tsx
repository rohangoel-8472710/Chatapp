import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Signin from './Containers/Login/indexSignIn';
import SignUp from './Containers/Login/indexSignUp';
import Chat from '../src/Containers/Chat/indexChat';
import Chatlist from '../src/Containers/Chat/index';
const AppNavigator = createStackNavigator(
  {
    Signin: Signin,
    SignUp: SignUp,
    Chat: Chat,
    Chatlist:Chatlist
  },
  {
    initialRouteName: 'Signin',
    defaultNavigationOptions:{
        headerShown:false
    }
  
  },
);
export default createAppContainer(AppNavigator);
