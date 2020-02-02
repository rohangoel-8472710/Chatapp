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
import {vw} from '../../Constants/Dimensions';
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
  lastImg: any;
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
      lastImg: null,
    };
  }

  componentDidMount() {
    this.getInbox();
  }

  //
  getdata = () => {
    var newData: Array<any> = [];
    Firebaseservices.fetchList((message: any) => {
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
    Firebaseservices.inboxList(this.state.uid, (data: any) => {
      if (data !== null) {
        var objData = Object.keys(data).map(function(key) {
          return data[key];
        });
        objData.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
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
      type: 'normal',
      roomID: chatRoomId,
      username: user.displayName,
      userid: user.key,
      useravatar: user.photoURL,
    });
  };

  //
  existchatroom = (
    type: string,
    id: string,
    avatar: string,
    name: string,
    roomID: string,
  ) => {
    this.props.navigation.navigate('Chat', {
      type: type,
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

  ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  headerItems = () => {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.txt}
          onPress={() => {
            this.setState({Show: !this.state.Show}),
              this.props.navigation.navigate('Group', {list: this.state.list});
          }}>
          <View style={styles.msgView}>
            <Text style={styles.nameStyle}>Create Group</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <View style={styles.header}>
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
            ItemSeparatorComponent={this.ItemSeparator}
            renderItem={this.renderinbox}
            alwaysBounceVertical={false}
            bounces={false}
            style={{
              width: vw(375),
            }}
          />
        )}

        {this.state.Show && (
          <FlatList
            style={styles.userlist}
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            ListHeaderComponent={
              this.state.list !== null ? this.headerItems : null
            }
            renderItem={this.renderData}
            alwaysBounceVertical={false}
          />
        )}
      </SafeAreaView>
    );
  }
}
