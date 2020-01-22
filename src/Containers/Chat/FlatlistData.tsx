import * as React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
//import {styles} from '../../styles/styles';
import styles from '../Chat/styles';

export interface AppProps {
  navigation?: any;
  chat: Function;
  item: any;
}

export interface AppState {}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={styles.List}
          onPress={() => this.props.chat(item)}>
          <View style={styles.messageview}>
            <Text style={styles.textname}>{item.displayname}</Text>
          </View>
          {/* <Text style={styles.textEmail}>{this.props.email}</Text> */}
          {/* <Text style={styles.message}>{this.props.message}</Text> */}
        </TouchableOpacity>
        {/* <View style={styles.lastMessage}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.message}>{this.props.msg}</Text>
        </View> */}
      </SafeAreaView>
    );
  }
}
