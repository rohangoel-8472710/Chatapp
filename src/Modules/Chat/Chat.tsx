import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebaseservices from '../../utils/FirebaseServices';
import { TouchableOpacityProps,TextStyle,ViewStyle, } from 'react-native';
export interface Props {
  navigation: any;
  //message:string
}
interface State {
  messages: any;
  name: string;
  uid: string;
  email: string;
}
export default class Chat extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      uid: this.props.navigation.getParam('uid'),
      name: this.props.navigation.getParam('name'),
      email: this.props.navigation.getParam('email'),
      messages: [],
    };
  }
  componentDidMount() {
    console.warn(this.state.uid, this.state.email);
    Firebaseservices.refOn((message: any) => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
    Firebaseservices.writeinboxdata(
      this.state.uid,
      this.state.email,
      this.state.messages,
    );
  }
  //   componentWillUnmount() {
  //     Firebaseservices.refOff()
  // }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebaseservices.send}
        user={{
          name: 'Rohan',
          _id: this.state.uid,
        }}
      />
    );
  }
}
