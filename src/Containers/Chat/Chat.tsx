import React, {Component} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Bubble,
  Time,
  Day,
} from 'react-native-gifted-chat';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';
import VectorIcons from '../../Constants/VectorIcons';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import {vw, vh} from '../../Constants/Dimensions';
import {ImagePicker} from '../../Components';
export interface Props {
  navigation: any;
  user: any;
}
interface State {
  messages: any;
  lastMsg: string;
  isTyping: boolean;
  allGroupUsers: Array<any>;
  source: string;
  loadState: boolean;
  multiplesource: Array<string>;
}

var counter: number = 1;

export default class Chat extends Component<Props, State> {
  giftedChatRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      lastMsg: '',
      isTyping: false,
      allGroupUsers: [],
      source: '',
      loadState: false,
      multiplesource: [],
    };
  }
  componentDidMount() {
    counter = 1;

    // fetching all memebers of group
    if (this.props.navigation.getParam('type') === 'group') {
      Firebaseservices.fetchingGroupUsers(
        this.props.navigation.getParam('roomID'),
        this.setGpusers,
      );
    } else {
      //loading messages
      this.refOn();
    }

    // fetching typing status
    if (this.props.navigation.getParam('type') === 'normal') {
      Firebaseservices.fetchTyping(
        this.props.navigation.getParam('roomID'),
        this.props.navigation.getParam('userid'),
        this.getTyping,
      );
    }
  }

  getTyping = (data: any) => {
    if (data !== null) {
      this.setState({
        isTyping: data.isTyping,
      });
    }
  };

  refOn = () => {
    Firebaseservices.refOn(
      counter,
      this.props.navigation.getParam('roomID'),
      this.props.navigation.getParam('type'),
      this.props.navigation.getParam('type') === 'normal'
        ? []
        : this.state.allGroupUsers,
      (message: any) => {
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, message),
        //   lastMsg: message,
        // }));
        if (message.length !== 20 * counter) {
          this.setState({loadState: false});
        } else {
          this.setState({loadState: true});
        }
        this.setState({
          messages: message,
          lastMsg: message,
        });
      },
    );
  };

  Typing = (text: string) => {
    if (text !== '') {
      Firebaseservices.Typingdisplay(
        this.props.navigation.getParam('roomID'),
        this.props.user.key,
      );
    } else {
      Firebaseservices.falseTypingIndicator(
        this.props.navigation.getParam('roomID'),
        this.props.user.key,
      );
    }
  };

  get user() {
    if (this.props.navigation.getParam('type') === 'normal') {
      return {
        _id: this.props.user.key,
        _name: this.props.user.displayName,
        avatar: this.props.user.photoURL,
        id: this.props.navigation.getParam('userid'),
        name: this.props.navigation.getParam('username'),
        newavatar: this.props.navigation.getParam('useravatar'),
        roomID: this.props.navigation.getParam('roomID'),
        email: this.props.user.email,
        type: 'normal',
      };
    } else if (this.props.navigation.getParam('type') === 'group') {
      return {
        _id: this.props.user.key,
        _name: this.props.user.displayName,
        avatar: this.props.user.photoURL,
        id: this.props.navigation.getParam('roomID'),
        name: this.props.navigation.getParam('username'),
        newavatar: this.props.navigation.getParam('useravatar'),
        roomID: this.props.navigation.getParam('roomID'),
        email: this.props.user.email,
        type: 'group',
      };
    }
  }

  setGpusers = (userList: any) => {
    var arr = userList.AllUsers.map((obj: {key: string}) => obj.key);
    arr = arr.concat(userList.creator.key);
    this.setState(
      {
        allGroupUsers: arr,
      },
      () => this.refOn(),
    );
  };

  uploadImage = (img: string) => {
    Firebaseservices.uploadMsgPic(img, (url: string) => {
      this.setState(
        {
          source: url,
        },
        () => this.giftedChatRef.onSend({text: ''}, true),
      );
    });
  };

  singleImagePicker = () => {
    ImagePicker.GetPic((response: string) => {
      this.uploadImage(response);
    });
  };

  multipleImagePicker = () => {
    ImagePicker.GetMultiplePic((response: Array<string>) => {
      this.setState(
        {
          multiplesource: response,
        },
        () => console.log(this.state.multiplesource),
      );
    });
  };

  loadMsgs = () => {
    counter = counter + 1;
    this.refOn();
  };

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

  componentWillUnmount() {
    Firebaseservices.refOff();
  }

  public render() {
    const img = this.props.navigation.getParam('useravatar');
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.chatHeader}>
          <View style={styles.leftheader}>
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
              <Text style={styles.headerName}>
                {this.props.navigation.getParam('username')}
              </Text>

              {this.state.isTyping ? (
                <Text style={styles.Typingtext}> ({Strings.typing})</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.cameraIcon}>
            <VectorIcons.FontAwesome
              name="camera"
              size={vw(25)}
              color={Colors.greyishBrown}
              onPress={() => {
                Alert.alert(
                  'Pick Image From',
                  '',
                  [
                    {text: 'Gallery', onPress: () => this.singleImagePicker()},
                    // {text: 'Gallery', onPress: () => this.multipleImagePicker()},
                    {text: 'Cancel', onPress: () => console.log('cancelled')},
                  ],
                  {cancelable: true},
                );
              }}
            />
          </View>
        </View>
        <GiftedChat
          ref={ref => {
            this.giftedChatRef = ref;
          }}
          messages={this.state.messages}
          onSend={messages =>
            Firebaseservices.send(messages, this.state.source)
          }
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
          onInputTextChanged={(text: string) => this.Typing(text)}
          loadEarlier={this.state.loadState}
          onLoadEarlier={this.loadMsgs}
        />
      </SafeAreaView>
    );
  }
}
