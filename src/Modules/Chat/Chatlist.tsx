import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
// import {styles} from '../../styles/styles';
import styles from '../Chat/styles';
import FlatlistData from './FlatlistData';
import Images from '../../Constants/Images';
export interface Props {
  navigation: any;
}

interface State {
  data: any;
  name: string;
  uid: string;
  email: string;
  list: Array<any>;
  showList: boolean;
  lastmessagesearch: Array<any>;
  chatsDone: boolean;
  updatedData: any;
}

export default class Chatlist extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      list: [],
      uid: this.props.navigation.getParam('uid'),
      name: this.props.navigation.getParam('name'),
      email: this.props.navigation.getParam('email'),
      showList: false,
      lastmessagesearch: [],
      chatsDone: false,
      updatedData: [],
    };
  }

  componentDidMount() {
    var arr = this.state.list;
    Firebaseservices.readUserData((data: any) => {
      //console.warn('data -> ', data);
      arr = arr.concat(data);
    });
    //console.warn('arr ', arr);
    setTimeout(() => {
      this.setState({
        list: arr,
      });
      //console.warn('data ', this.state.list);
    }, 1000);
    Firebaseservices.readInboxData(this.getLastMessages);
  }

  getnewdata = (data: any) => {
    // console.warn('data ',data);
    var arr: Array<any> = [];
    let tempArray = this.state.data;
    let indexToFind = tempArray.findIndex(
      (item: any) => item[0] === this.state.uid,
    );
    tempArray.splice(indexToFind, 1);
  };
  displaylist = () => {
    this.setState({showList: true});
  };

  // getmessages = (data: any) => {
  //   var result = Object.keys(data).map(function(key) {
  //     return [String(key), data[key]];
  //   });
  //   this.setState({
  //     lastmessagesearch: result,
  //   });
  //   let tempArray = this.state.lastmessagesearch;
  //   let indexToFind = tempArray.findIndex(
  //     (item: any) => item[0] === this.state.uid,
  //   );
  //   let chatRoomToFind = tempArray[indexToFind];
  //   this.setState({
  //     lastmessagesearch: chatRoomToFind,
  //   });
  //   if (this.state.data !== null) {
  //     for (let i = 0; i < this.state.data.length; i++) {
  //       let message = this.state.lastmessagesearch;
  //       let keys = Object.keys(message);
  //       let uidcheck = keys[i];
  //       for (let j = 0; j < this.state.data.length; j++) {
  //         if (keys[i] === this.state.data[j][0]) {
  //           this.state.data[j][1].message = message[uidcheck].text;
  //           this.state.data[j][1].time = message[uidcheck].createdAt;
  //         }
  //       }
  //     }
  //   }
  // };
  getLastMessages = (data: any) => {
    if (data) {
      var result: Array<any> = Object.keys(data).map(function(key) {
        return [String(key), data[key]];
      });
      this.setState({
        lastmessagesearch: result,
        chatsDone: true,
      });
      for (let i = 0; i < this.state.data.length; i++) {
        for (let j = 0; j < this.state.lastmessagesearch.length; j++) {
          if (this.state.lastmessagesearch[j][0] === this.state.data[i][0]) {
            this.getUpdatedData(
              this.state.data[i],
              this.state.lastmessagesearch[j],
            );
          }
        }
      }
    }
  };
  getUpdatedData = (data: any, lastMessage: any) => {
    let tempArr = this.state.updatedData;
    let indexToFind = tempArr.findIndex((item: any) => item[0] === data[0]);
    if (indexToFind === -1) {
      data[1].message = lastMessage[1].text;
      data[1].time = lastMessage[1].gettingTime;
      // console.log('lastMessage[1].textß', lastMessage[1].text)
      setTimeout(() => {
        this.state.updatedData.push(data);
        this.forceUpdate();
      }, 10);
    }
  };
  renderData = (rowData: any) => {
    const {item} = rowData;
    // console.warn('rowData ', item.id)
    //  console.warn(item)
    return (
      this.state.showList && (
        <FlatlistData
          id={item.id}
          email={item.email}
          message={item.message}
          name={item.name}
          chat={this.oneOnOneChat}
        />
      )
    );
  };

  oneOnOneChat = (uid: string) => {
    console.warn('uid ', uid);
    var chatRoomId: string;
    if (uid > this.state.uid) {
      chatRoomId = uid.concat(this.state.uid);
    } else {
      chatRoomId = this.state.uid.concat(uid);
    }
    this.props.navigation.navigate('Chat', {
      name: this.state.name,
      email: this.state.email,
      uid: this.state.uid,
      sendingChat: chatRoomId,
    });
  };

  verifying = () => {
    if (this.state.chatsDone && this.state.updatedData.length !== 0) {
      return (
        <FlatList
          data={this.state.updatedData}
          renderItem={this.renderData}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else {
      return (
        <View style={styles.centerNoChats}>
          <Image source={Images.noChat} style={styles.noChatImage} />
          <Text style={styles.noChat}>No Chats</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.parent}>
        <TouchableOpacity style={styles.addicon} onPress={this.displaylist}>
          <Text style={styles.plustyle}>+</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderData}
        />
      </View>
    );
  }
}
