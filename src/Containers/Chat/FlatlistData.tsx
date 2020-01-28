import * as React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import styles from '../Chat/styles';
import Images from '../../Constants/Images';

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
      <TouchableOpacity
        style={styles.parentview}
        onPress={() => this.props.chat(item)}>
        <View style={styles.messageview}>
          <Image
            source={
              item.photoURL === '' ? Images.PROFILE : {uri: item.photoURL}
            }
            style={styles.profileuser}
          />
          <Text style={styles.textusername}>{item.displayName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
