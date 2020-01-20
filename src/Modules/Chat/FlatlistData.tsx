import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/styles';

export interface AppProps {
  id: string;
  email: string;
  navigation?: any;
  chat: Function;
  message: string;
  name: string;
}

export interface AppState {}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  //   oneOnOneChat(uid: string) {
  //     var chatRoomId: string;
  //     if (uid > this.props.uid) {
  //       chatRoomId = uid.concat(this.props.uid);
  //     } else {
  //       chatRoomId = this.props.uid.concat(uid);
  //     }
  //     this.props.navigation.navigate('Chat', {
  //       //   name:this.props.name,
  //       email: this.props.email,
  //       uid: this.props.uid,
  //       sendingChat: chatRoomId,
  //     });
  //   }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.List}
          onPress={() => this.props.chat(this.props.id)}>
          <Text>{this.props.email}</Text>
          <Text style={styles.message}>{this.props.message}</Text>
        </TouchableOpacity>
        {/* <View style={styles.lastMessage}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.message}>{this.props.msg}</Text>
        </View> */}
      </View>
    );
  }
}
