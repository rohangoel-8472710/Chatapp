import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

/*
 ** Custom Imports
 */
import {vw, vh} from '../Constants/Dimensions';
import Strings from '../Constants/Strings';
import Images from '../Constants/Images';
import Colors from '../Constants/Colors';

interface Props {}
interface State {}

const data = [
  {
    title: Strings.medical_products,
    image: Images.medical,
    sign: Images.arrow,
  },
  {
    title: Strings.bathroom_aids,
    image: Images.medical,
    sign: Images.arrow,
  },
];

export default class Menu extends Component<Props, State> {
  state = {};

  render() {
    return (
      <FlatList
        bounces={false}
        data={data}
        keyExtractor={(index: any) => index.toString()}
        renderItem={rowData => {
          return (
            <SafeAreaView>
              <TouchableOpacity style={styles.commonView} activeOpacity={0.6}>
                <Image style={styles.imgStyle} source={rowData.item.image} />
                <Text style={styles.textStyle}>{rowData.item.title}</Text>
                <Image style={styles.arrowImage} source={rowData.item.sign} />
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  commonView: {
    flexDirection: 'row',
    marginLeft: vw(20),
    marginTop: vw(30),
  },
  imgStyle: {
    width: vw(30),
    height: vw(24),
  },
  textStyle: {
    fontSize: vw(15),
    fontWeight: '500',
    color: Colors.black,
    alignSelf: 'center',
    marginLeft: vw(27),
  },
  arrowImage: {
    width: vw(6),
    height: vw(12),
    alignSelf: 'center',
  },
});
