import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import FlatlistData from './FlatlistData';
import Firebaseservices from '../../utils/FirebaseServices';
import Colors from '../../Constants/Colors';
import Images from '../../Constants/Images';
import Modal from './Modal';
import LinearGradient from 'react-native-linear-gradient';
interface Props {
  navigation?: any;
  user: any;
}

interface State {
  list: Array<any>;
  groupname: string;
  selectedList: Array<any>;
  groupPic: string;
  show: boolean;
  animate: boolean;
}

export default class Group extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: this.props.navigation.getParam('list'),
      groupname: '',
      selectedList: [],
      groupPic: '',
      show: false,
      animate: false,
    };
  }
  createGroup = () => {
    Firebaseservices.CreatingGroup(
      this.state.groupname,
      this.state.selectedList,
      this.state.groupPic,
      this.props.user,
      (data: any) => {
        this.setState({show: false, animate: false});
        this.props.navigation.navigate('Chat', {
          type: 'group',
          roomID: this.state.groupname,
          receiverName: this.state.groupname,
          receiverAvatar: this.state.groupPic,
        });
      },
    );
  };

  uploadImage = (text: string) => {
    this.setState({animate: true});
    if (!!text) {
      Firebaseservices.uploadImage(
        this.state.groupname,
        text,
        (uri: string) => {
          if (uri !== null) {
            this.setState({groupPic: uri}, () => this.createGroup());
          }
        },
      );
    } else {
      this.createGroup();
    }
  };

  renderItems = (rowData: any) => {
    const {key, item} = rowData;
    return (
      <FlatlistData
        item={item}
        open={() => this.setState({show: true})}
        selectedList={(state: string, list: any) => {
          var temp = this.state.selectedList;
          if (state === 'select') {
            temp.push(list);
            this.setState({selectedList: temp});
          } else if ('unselect') {
            temp = temp.filter(obj => obj.key !== list.key);
            this.setState({selectedList: temp});
          }
        }}
      />
    );
  };

  headerItems = () => {
    return (
      <View style={styles.txt}>
        <Text>Add Participants</Text>
      </View>
    );
  };

  Itemseperator = () => {
    return <View style={styles.separator} />;
  };

  public render() {
    return (
      <View style={styles.parent}>
        <ActivityIndicator
          animating={this.state.animate}
          size={'large'}
          style={styles.indicator}
          color={Colors.tealBlue}
        />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => this.props.navigation.pop()}>
            <Image source={Images.BackButton} />
          </TouchableOpacity>
          <Text>New Group</Text>
        </View>
        <FlatList
          style={styles.flatstyle}
          ListHeaderComponent={this.headerItems}
          ItemSeparatorComponent={this.Itemseperator}
          data={this.state.list}
          renderItem={this.renderItems}
        />
        {this.state.show && (
          <Modal
            gpName={(text: string) => this.setState({groupname: text})}
            visible={this.state.show}
            image={(text: string) => this.uploadImage(text)}
            Action={() => this.setState({show: false})}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({show: !this.state.show})}
          disabled={this.state.selectedList.length === 0 ? true : false}>
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#01a7a3', '#66eb8f']}
            style={[
              styles.Gradient,
              this.state.selectedList.length === 0 ? styles.Disable : null,
            ]}>
            <Text style={styles.plusbutton}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
