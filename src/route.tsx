import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Signin from '../src/Containers/Login/Signin';
import SignUp from '../src/Containers/Login/Signup';
import Chat from '../src/Containers/Chat/Chat';
import Chatlist from '../src/Containers/Chat/Chatlist';
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
