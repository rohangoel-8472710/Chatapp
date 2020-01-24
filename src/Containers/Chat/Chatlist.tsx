import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
import styles from '../Chat/styles';
import FlatlistData from './FlatlistData';
import InboxList from './InboxList';
import Images from '../../Constants/Images';
export interface Props {
  navigation?: any;
  uid: string;
  email: string;
  user: any;
  updateUserdetails: Function;
}

interface State {
  data: Array<any>;
  name: string;
  uid: string;
  email: string;
  lastMsgData: Array<any>;
  list: Array<any>;
  Show: boolean;
  roomID: string;
  chatsDone: boolean;
  updatedData: any;
  chatEmpty: boolean;
}

export default class Chatlist extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      list: [],
      uid: this.props.uid,
      name: this.props.navigation.getParam('name'),
      email: this.props.email,
      Show: false,
      chatsDone: false,
      updatedData: [],
      chatEmpty: false,
      lastMsgData: [],
      roomID: '',
    };
  }

  componentDidMount() {
    this.getInbox();
  }

  //
  getdata = () => {
    //console.warn('displaylist');
    var newData: Array<any> = [];
    Firebaseservices.fetchList((message: any) => {
      // console.warn('user details -- ', message);
      if (this.props.uid !== message.key) {
        newData = newData.concat(message);
      } else {
        this.props.updateUserdetails(message);
      }
    });
    setTimeout(() => {
      this.setState({list: newData});
    }, 500);
  };

  //
  getInbox = () => {
    //console.warn('Inbox')
    Firebaseservices.inboxList(this.state.uid, (data: any) => {
      // console.warn('Inbox  ', data);
      if (data !== null) {
        var objData = Object.keys(data).map(function(key) {
          return data[key];
        });
        this.setState(
          {
            chatEmpty: false,
            lastMsgData: objData,
          },
          () => this.getdata(),
        );
      } else {
        this.setState({
          chatEmpty: true,
        });
      }
    });
  };

  //
  displaylist = () => {
    this.setState(
      {
        Show: !this.state.Show,
      },
      () => {
        if (this.state.Show) {
          this.getdata();
        }
      },
    );
  };

  //
  chatRoom = (user: any) => {
    let chatRoomId: string;
    if (user.key > this.props.uid) {
      chatRoomId = user.key.concat(this.props.uid);
    } else {
      chatRoomId = this.props.uid.concat(user.key);
    }
    this.setState({roomID: chatRoomId, Show: !this.state.Show});
  
    this.props.navigation.navigate('Chat', {
      roomID: chatRoomId,
      username: user.displayname,
      userid: user.key,
      useravatar: user.imageURL,
    });
  };

  //
  existchatroom = (
    id: string,
    name: string,
    avatar: string,
    roomID: string,
  ) => {
    this.props.navigation.navigate('Chat', {
      roomID: roomID,
      userid: id,
      username: name,
      useravatar: avatar,
    });
  };

  //
  renderData = (rowData: any) => {
    const {key, item} = rowData;
    return <FlatlistData item={item} chat={this.chatRoom} />;
  };

  //
  renderinbox = (rowData: any) => {
    const {key, item} = rowData;
    return (
      <InboxList item={item} open={this.existchatroom} uid={this.props.uid} />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.BackButton} style={styles.backButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addicon}
            onPress={() => this.displaylist()}>
            <Image
              source={this.state.Show ? Images.MINUS : Images.PLUS}
              style={styles.addimg}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.chats}>Chats</Text>

        {this.state.chatEmpty ? (
          <View style={styles.centerNoChats}>
            <Image source={Images.noChat} style={styles.noChatImage} />
            <Text style={styles.noChat}>No Chats</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.lastMsgData}
            keyExtractor={(item, key) => key.toString()}
            renderItem={this.renderinbox}
          />
        )}

        {this.state.Show && (
          <FlatList
            style={styles.userlist}
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderData}
          />
        )}
      </SafeAreaView>
    );
  }
}
