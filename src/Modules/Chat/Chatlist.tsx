import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Firebaseservices from '../../utils/FirebaseServices';
import {styles} from '../../styles/styles';
import FlatlistData from './FlatlistData';

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
  lastmessagesearch: any;
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
      lastmessagesearch: null,
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
    Firebaseservices.readInboxData(this.getmessages);
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

  getmessages = (data: any) => {
    var result = Object.keys(data).map(function(key) {
      return [String(key), data[key]];
    });
    this.setState({
      lastmessagesearch: result,
    });
    let tempArray = this.state.lastmessagesearch;
    let indexToFind = tempArray.findIndex(
      (item: any) => item[0] === this.state.uid,
    );
    let chatRoomToFind = tempArray[indexToFind];
    this.setState({
      lastmessagesearch: chatRoomToFind,
    });
    if (this.state.data !== null) {
    for (let i = 0; i < this.state.data.length; i++) {
      let message = this.state.lastmessagesearch;
      let keys = Object.keys(message);
      let uidcheck = keys[i];
      for (let j = 0; j < this.state.data.length; j++) {
        if (keys[i] === this.state.data[j][0]) {
          this.state.data[j][1].message = message[uidcheck].text;
          this.state.data[j][1].time = message[uidcheck].createdAt;
        }
      }
    }}
  };
  // getdata = (data: any) => {
  //   var result = Object.keys(data).map(function(key) {
  //     return [String(key), data[key]];
  //   });
  //   this.setState({
  //     data: result,
  //   });
  //   let tempArray = this.state.data;
  //   let indexToFind = tempArray.findIndex(
  //     (item: any) => item[0] === this.state.uid,
  //   );
  //   tempArray.splice(indexToFind, 1);
  // };
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
    //console.warn('uid ', uid);
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

  render() {
    return (
      <View style={styles.parent}>
        
        <TouchableOpacity style={styles.addicon} onPress={this.displaylist}>
          <Text style={styles.plustyle}>+</Text>
        </TouchableOpacity>
     
        <FlatList
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {this.renderData}         
        />
      </View>
    );
  }
}
