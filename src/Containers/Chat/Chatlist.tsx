import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
// import {styles} from '../../styles/styles';
import styles from '../Chat/styles';
import FlatlistData from './FlatlistData';
import InboxList from './InboxList';
import Images from '../../Constants/Images';
export interface Props {
  navigation?: any;
  uid: string;
  email: string;
  user: any;
  updatedata: Function;
}

interface State {
  data: Array<any>;
  name: string;
  uid: string;
  email: string;
  list: Array<any>;
  showList: boolean;
  roomID: string;
  chatsDone: boolean;
  updatedData: any;
  chatEmpty: boolean;
  lastmsg: Array<any>;
}

export default class Chatlist extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      list: [],
      uid: this.props.navigation.getParam('uid'),
      name: this.props.navigation.getParam('name'),
      email: this.props.navigation.getParam('email'),
      showList: false,
      chatsDone: false,
      updatedData: [],
      chatEmpty: false,
      lastmsg: [],
      roomID: '',
    };
  }

  componentDidMount() {
    this.getInbox();
    // var arr = this.state.list;
    // Firebaseservices.readUserData((data: any) => {
    //   //console.warn('data -> ', data);
    //   arr = arr.concat(data);
    // });
    // //console.warn('arr ', arr);
    // setTimeout(() => {
    //   this.setState({
    //     list: arr,
    //   });
    //   //console.warn('data ', this.state.list);
    // }, 1000);
    // Firebaseservices.readInboxData(this.getLastMessages);
  }

  // getuserdata = (data: any) => {
  //   // console.warn('data ',data);
  //   var arr: Array<any> = [];
  //   let tempArray = this.state.data;
  //   let indexToFind = tempArray.findIndex(
  //     (item: any) => item[0] === this.state.uid,
  //   );
  //   tempArray.splice(indexToFind, 1);
  //   this.setState({
  //     data: tempArray.splice(0),
  //   });
  // };

  //
  getdata = () => {
    var newData: Array<any> = [];
    Firebaseservices.getList((message: any) => {
      if (this.props.uid !== message.key) {
        newData = newData.concat(message);
      } else {
        this.props.updatedata(message);
      }
    });
    setTimeout(() => {
      this.setState({list: newData});
    }, 500);
  };

  //
  getInbox = () => {
    Firebaseservices.Inboxlist(this.state.uid, (data: any) => {
      if (data !== null) {
        var objData = Object.keys(data).map(function(key) {
          return data[key];
        });
        this.setState(
          {
            chatEmpty: false,
            lastmsg: objData,
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
    this.setState({showList: true}, () => {
      if (this.state.showList) {
        this.getdata();
      }
    });
  };

  //
  chatRoom = (user: any) => {
    let chatRoomId: string;
    if (user.key > this.props.uid) {
      chatRoomId = user.key.concat(this.props.uid);
    } else {
      chatRoomId = this.props.uid.concat(user.key);
    }
    this.setState({roomID: chatRoomId, showList: !this.state.showList});
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

  renderinbox = (rowData: any) => {
    const {key, item} = rowData;
    return <InboxList item={item} chat={this.existchatroom} />;
  };
  // getLastMessages = (data: any) => {
  //   if (data) {
  //     var result: Array<any> = Object.keys(data).map(function(key) {
  //       return [String(key), data[key]];
  //     });
  //     this.setState({
  //       lastmessagesearch: result,
  //       chatsDone: true,
  //     });
  //     for (let i = 0; i < this.state.data.length; i++) {
  //       for (let j = 0; j < this.state.lastmessagesearch.length; j++) {
  //         if (this.state.lastmessagesearch[j][0] === this.state.data[i][0]) {
  //           this.getUpdatedData(
  //             this.state.data[i],
  //             this.state.lastmessagesearch[j],
  //           );
  //         }
  //       }
  //     }
  //   }
  // };
  // getUpdatedData = (data: any, lastMessage: any) => {
  //   let tempArr = this.state.updatedData;
  //   let indexToFind = tempArr.findIndex((item: any) => item[0] === data[0]);
  //   if (indexToFind === -1) {
  //     data[1].message = lastMessage[1].text;
  //     data[1].time = lastMessage[1].gettingTime;
  //     // console.log('lastMessage[1].textß', lastMessage[1].text)
  //     setTimeout(() => {
  //       this.state.updatedData.push(data);
  //       this.forceUpdate();
  //     }, 10);
  //   }
  // };
  // renderData = (rowData: any) => {
  //   const {key, item} = rowData;
  //   // console.warn('rowData ', item.id)
  //   //  console.warn(item)
  //   return (
  //     this.state.showList && (
  //       <FlatlistData
  //         item={item}
  //         email={item.email}
  //         message={item.message}
  //         name={item.name}
  //         chat={this.chatRoom}
  //       />
  //     )
  //   );
  // };

  // oneOnOneChat = (uid: string) => {
  //   console.warn('uid ', uid);
  //   var chatRoomId: string;
  //   if (uid > this.state.uid) {
  //     chatRoomId = uid.concat(this.state.uid);
  //   } else {
  //     chatRoomId = this.state.uid.concat(uid);
  //   }
  //   this.props.navigation.navigate('Chat', {
  //     name: this.state.name,
  //     email: this.state.email,
  //     uid: this.state.uid,
  //     sendingChat: chatRoomId,
  //   });
  // };

  // verifying = () => {
  //   if (this.state.chatsDone && this.state.updatedData.length !== 0) {
  //     return (
  //       <FlatList
  //         data={this.state.updatedData}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={this.renderData}
  //       />
  //     );
  //   } else {
  //     return (
  //       <View style={styles.centerNoChats}>
  //         <Image source={Images.noChat} style={styles.noChatImage} />
  //         <Text style={styles.noChat}>No Chats</Text>
  //       </View>
  //     );
  //   }
  // };

  render() {
    return (
      <View style={styles.parent}>
        <TouchableOpacity style={styles.addicon} onPress={this.displaylist}>
          <Text style={styles.plustyle}>+</Text>
        </TouchableOpacity>
        <Text style={styles.chats}>Chats</Text>
        {this.state.chatEmpty ? (
          <View style={styles.centerNoChats}>
            <Image source={Images.noChat} style={styles.noChatImage} />
            <Text style={styles.noChat}>No Chats</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.lastmsg}
            keyExtractor={(item, key) => key.toString()}
            renderItem={this.renderinbox}
          />
        )}

        {this.state.showList && (
          <FlatList
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderData}
          />
        )}
      </View>
    );
  }
}
