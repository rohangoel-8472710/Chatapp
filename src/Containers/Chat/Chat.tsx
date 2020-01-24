import React, {Component} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Bubble,
} from 'react-native-gifted-chat';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';
export interface Props {
  navigation: any;
  user: any;
  //message:string
}
interface State {
  messages: any;
  lastMsg: string;
}
export default class Chat extends Component<Props, State> {
  giftedChatRef: any;
  constructor(props: Props) {
    // console.warn('chat -> ', props.user);
    super(props);
    this.state = {
      messages: [],
      lastMsg: '',
    };
  }
  componentDidMount() {
    // console.warn(this.props.user);
    Firebaseservices.refOn(
      this.props.navigation.getParam('roomID'),
      (message: any) => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
          lastMsg: message,
        }));
      },
    );
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

  rendersend = (props: any) => {
    const msg = this.giftedChatRef.state.text || '';
    return (
      <View>
        <TouchableOpacity
          style={styles.sendbutton}
          activeOpacity={1}
          onPress={() => {
            if (msg.trim().length > 0) {
              this.giftedChatRef.onSend({text: msg.trim()}, true);
            } else {
              return;
            }
          }}>
          <Image source={Images.SEND} />
        </TouchableOpacity>
      </View>
    );
  };
  renderinputtoolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        container={styles.Container}
        primary={styles.Primary}
      />
    );
  };
  rendercomposer = (props: any) => {
    return (
      <Composer
        {...props}
        placeholder="Type Message"
        textInputStyle={styles.inputText}
      />
    );
  };
  renderbubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.Left,
          right: styles.Right,
        }}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.headerChat}
            onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.BackButton} />
          </TouchableOpacity>
          <Text style={styles.headerName}>
            {this.props.navigation.getParam('receiverName')}
          </Text>
        </View>
        <GiftedChat
          ref={ref => {
            this.giftedChatRef = ref;
          }}
          messages={this.state.messages}
          onSend={Firebaseservices.send}
          user={this.user}
          renderSend={this.rendersend}
          renderInputToolbar={this.renderinputtoolbar}
          renderComposer={this.rendercomposer}
          renderBubble={this.renderbubble}
        />
      </View>
    );
  }
}
