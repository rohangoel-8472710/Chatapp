import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../Chat/styles';
import {AppState} from './FlatlistData';
export interface AppProps {
  navigation?: any;
  open: Function;
  item: any;
  uid: string;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {item} = this.props;
    const {user} = this.props.item;
    const val = this.props.uid === user.id;
    return (
      <View style={styles.inboxview}>
        <View>
          <Image
            source={{uri: val ? user.avatar : user.newavatar}}
            styles={styles.profile}
          />
        </View>
        <TouchableOpacity
          style={styles.text}
          onPress={() =>
            this.props.open(
              val ? user._id : user.id,
              val ? user.avatar : user.newavatar,
              val ? user._name : user.name,
              user.roomID,
            )
          }>
          <View style={styles.messageview}>
            <Text style={styles.textname}>{val ? user._name : user.name}</Text>
            <Text style={styles.lastmessage}>{item.lastMsg}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
