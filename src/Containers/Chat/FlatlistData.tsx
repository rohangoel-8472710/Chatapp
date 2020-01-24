import * as React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
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
    // console.warn('item ', item);
    return (
      <View style={styles.parentview}>
        <>
          <Image source={{uri: item.imageURL}} style={styles.profile} />
        </>
        <TouchableOpacity
          style={styles.List}
          onPress={() => this.props.chat(item)}>
          <View style={styles.messageview}>
            <Text style={styles.textname}>{item.displayName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
