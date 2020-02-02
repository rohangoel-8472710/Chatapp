import * as React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import styles from './styles';
import Images from '../../Constants/Images';
interface AppProps {
  item: any;
  open: Function;
  selectedList: Function;
}
interface AppState {
  select: boolean;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      select: false,
    };
  }
  Selection = () => {
    this.setState({select: !this.state.select}, () => {
      {
        this.state.select
          ? this.props.selectedList('select', this.props.item)
          : this.props.selectedList('unselect', this.props.item);
      }
    });
  };

  public render() {
    const {item} = this.props;
    return (
      <View style={[styles.parent, this.state.select ? styles.selected : null]}>
        <TouchableOpacity style={styles.flatview} onPress={this.Selection}>
          <Image
            source={
              item.photoURL === '' ? Images.PROFILE : {uri: item.photoURL}
            }
            style={styles.imgprofile}
          />
          {this.state.select ? (
            <Image source={Images.Check} style={styles.Check} />
          ) : null}
          <Text style={styles.nametext}>{item.displayName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
