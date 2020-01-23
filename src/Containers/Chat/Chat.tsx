import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebaseservices from '../../utils/FirebaseServices';
//import {TouchableOpacityProps, TextStyle, ViewStyle} from 'react-native';
export interface Props {
  navigation: any;
  user: any;
  //message:string
}
interface State {
  messages: any;
  lastmsg: string;
}
export default class Chat extends Component<Props, State> {
  constructor(props: Props) {
    console.warn('chat -> ', props.user);
    super(props);
    this.state = {
      messages: [],
      lastmsg: '',
    };
  }
  componentDidMount() {
    console.warn(this.props.user);
    Firebaseservices.refOn(
      this.props.navigation.getParam('roomID'),
      (message: any) => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
          lastmsg: message,
        }));
      },
    );
    // Firebaseservices.writeinboxdata(
    //   this.state.uid,
    //   this.state.email,
    //   this.state.messages,
    // );
  }
  get user() {
    return {
      _id: this.props.user.key,
      _name: this.props.user.displayName,
      avatar: this.props.user.imageURL,
      id: this.props.navigation.getParam('userid'),
      name: this.props.navigation.getParam('username'),
      newavatar: this.props.navigation.getParam('useravatar'),
      roomID: this.props.navigation.getParam('roomID'),
      email: this.props.user.email,
    };
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebaseservices.send}
        user={this.user}
      />
    );
  }
}
