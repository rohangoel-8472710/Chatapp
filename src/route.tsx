import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Signin from '../src/Modules/Login/Signin';
import SignUp from '../src/Modules/Login/Signup';
import Chat from '../src/Modules/Chat/Chat';
import Chatlist from '../src/Modules/Chat/Chatlist';
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
