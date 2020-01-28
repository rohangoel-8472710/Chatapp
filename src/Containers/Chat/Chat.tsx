import React, {Component} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Bubble,
  Time,
  Day,
} from 'react-native-gifted-chat';
import {View, TouchableOpacity, Image, Text, SafeAreaView} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';
export interface Props {
  navigation: any;
  user: any;
}
interface State {
  messages: any;
  lastMsg: string;
  typingText: boolean;
}
export default class Chat extends Component<Props, State> {
  giftedChatRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      lastMsg: '',
      typingText: false,
    };
  }
  componentDidMount() {
    Firebaseservices.getTypingValue(
      this.user.roomID,
      this.props.user.key,
      this.getTyping,
    );
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

  getTyping = (data: any) => {
    this.setState({
      typingText: data.typing,
    });
  };

  ontextChanged = (val: string) => {
    if (val !== '') {
      Firebaseservices.ChangeTypingText(this.user.roomID, this.user.id, true);
    } else {
      Firebaseservices.ChangeTypingText(this.user.roomID, this.user.id, false);
    }
  };

  get user() {
    return {
      _id: this.props.user.key,
      _name: this.props.user.displayName,
      avatar: this.props.user.photoURL,
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
        containerStyle={styles.Container}
        primaryStyle={styles.Primary}
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
        //@ts-ignore
        wrapperStyle={{
          left: styles.Left,
          right: styles.Right,
        }}
      />
    );
  };

  rendertime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: styles.textTime,
          right: styles.textTime,
        }}
      />
    );
  };

  renderday = (props: any) => {
    return (
      <Day {...props} wrapperStyle={styles.DAY} textStyle={styles.daytext} />
    );
  };

  renderchatfooter = () => {
    return <View style={styles.footer}></View>;
  };
  render() {
    const img = this.props.navigation.getParam('useravatar');
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.headerChat}
            onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.BackButton} />
          </TouchableOpacity>
          <View style={styles.imgheaderView}>
            <Image
              source={img === '' ? Images.PROFILE : {uri: img}}
              style={styles.imgheader}
            />
          </View>
          <Text style={styles.headerName}>
            {this.props.navigation.getParam('username')}
          </Text>
          <Text style={styles.Typingtext}>
            {this.state.typingText ? 'typing...' : ''}
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
          renderTime={this.rendertime}
          renderDay={this.renderday}
          renderChatFooter={this.renderchatfooter}
          showAvatarForEveryMessage={false}
          renderAvatarOnTop={true}
          showUserAvatar={true}
          onInputTextChanged={val => this.ontextChanged(val)}
          scrollToBottom={true}
        />
      </SafeAreaView>
    );
  }
}
