import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';
import {vw} from '../../Constants/Dimensions';
export interface AppProps {
  navigation?: any;
  open: Function;
  item: any;
  uid: string;
}

export default class AppComponent extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  pad = (num: number) => {
    return ('0' + num).slice(-2);
  };

  getTimefromDate = (timestamp: number) => {
    var date = new Date(timestamp);
    var hrs = date.getHours();
    var min = date.getMinutes();
    return this.pad(hrs) + ':' + this.pad(min);
  };

  public render() {
    const {item} = this.props;
    const {user} = this.props.item;
    console.warn('user ==>', user.avatar);
    return (
      <TouchableOpacity
        style={styles.inboxview}
        onPress={() =>
          this.props.open(user.id, user.avatar, user.name, item.roomID)
        }>
        <View style={styles.messageview}>
          <Image source={{uri: user.avatar}} style={styles.profile} />
          <View style={styles.msgandname}>
            <Text style={styles.textname}>{user.name}</Text>
            <Text style={styles.lastmessage} numberOfLines={1}>
              {item.lastMsg}
            </Text>
          </View>
        </View>
        <Text style={styles.Timetextinbox}>
          {this.getTimefromDate(item.createdAt)}
        </Text>
      </TouchableOpacity>
    );
  }
}
