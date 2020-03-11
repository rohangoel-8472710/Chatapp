import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Signin from './Containers/Login/indexSignIn';
import SignUp from './Containers/Login/indexSignUp';
import Chat from '../src/Containers/Chat/indexChat';
import Chatlist from '../src/Containers/Chat/index';
import Group from '../src/Containers/GroupChat/index';
import Counter from '../src/Containers/Counter/Counter';
import ImageFilters from '../src/Containers/Counter/ImageFilters';
import Toast from '../src/Containers/Counter/Toast';
import Text from '../src/Containers/MLKit/TextRecognition/Text';
import Splash from '../src/Containers/Login/Splash';
import Privacy from '../src/Containers/Privacy';
import Test from '../src/Containers/Counter/Test';
import ModalTester from '../src/Containers/Login/ModalTester';
import Menu from '../src/Containers/Menu';
import Slider from '../src/Containers/Slider';
import Profile from '../src/Containers/Profile';
const AppNavigator = createStackNavigator(
  {
    Signin: Signin,
    SignUp: SignUp,
    Chat: Chat,
    Chatlist: Chatlist,
    Group: Group,
    Counter: Counter,
    ImageFilters: ImageFilters,
    Toast: Toast,
    Text: Text,
    Splash: Splash,
    Privacy: Privacy,
    Test: Test,
    ModalTester: ModalTester,
    Menu: Menu,
    Slider: Slider,
    Profile: Profile,
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
export default createAppContainer(AppNavigator);
