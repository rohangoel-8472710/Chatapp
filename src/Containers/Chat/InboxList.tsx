import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';
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
    const val = this.props.uid === user.id;
    return (
      <View style={styles.inboxview}>
        <View>
          <Image
            source={{uri: val ? user.avatar : user.newavatar}}
            // source={Images.PROFILE}
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
            <Text style={styles.lastmessage} numberOfLines={1}>
              {item.lastMsg}
            </Text>
          </View>
          <View style={styles.Timeview}>
            <Text style={styles.Timetext}>
              {this.getTimefromDate(item.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
