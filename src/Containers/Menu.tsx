import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
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
  {
    title: Strings.general_wellness,
    image: Images.general,
    sign: Images.arrow,
    // styling: true,
  },
  {
    title: Strings.physio_ortho,
    image: Images.physio,
    sign: Images.arrow,
    // styling: true,
  },
  {
    title: Strings.mobility_aids,
    image: Images.medical,
    sign: Images.arrow,
  },
  {
    title: Strings.leisure,
    image: Images.leisure,
    sign: Images.arrow,
    // styling: true,
  },
  {
    title: Strings.bedroom_accessories,
    image: Images.medical,
    sign: Images.arrow,
  },
  {
    title: Strings.daily_living_aids,
    image: Images.general,
    sign: Images.arrow,
    // styling: true,
  },
  {
    title: Strings.smart_living,
    image: Images.physio,
    sign: Images.arrow,
    // styling: true,
  },
  {
    title: Strings.kitchen_gardening,
    image: Images.medical,
    sign: Images.arrow,
  },
  {
    title: Strings.food_diet,
    image: Images.leisure,
    sign: Images.arrow,
    // styling: true,
  },
];

const newData = [
  {
    title: Strings.new_arrivals,
    image: Images.leisure,
    var: true,
  },
  {
    title: Strings.best_sellers,
    image: Images.leisure,
  },
  {
    title: Strings.seniority_global,
    image: Images.medical,
  },
  {
    title: Strings.evergreen_brand,
    image: Images.general,
  },
  {
    title: Strings.offers,
    image: Images.physio,
    // var: false,
  },
  {
    title: Strings.myaccount,
    image: Images.medical,
  },
  {
    title: Strings.help,
    image: Images.leisure,
  },
];

export default class Menu extends Component<Props, State> {
  state = {};

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <FlatList
            bounces={false}
            data={data}
            keyExtractor={(index: any) => index.toString()}
            renderItem={rowData => {
              return (
                <TouchableOpacity style={styles.commonView} activeOpacity={0.6}>
                  <View style={{flexDirection: 'row'}}>
                    {/* {rowData.item.styling ? (
                    <Image
                      style={styles.newImgStyle}
                      source={rowData.item.image}
                    />
                  ) : (
                    <Image
                      style={styles.imgStyle}
                      source={rowData.item.image}
                    />
                  )} */}
                    <Image
                      resizeMode="contain"
                      style={styles.imgStyle}
                      source={rowData.item.image}
                    />
                    <Text style={styles.textStyle}>{rowData.item.title}</Text>
                  </View>
                  <Image style={styles.arrowImage} source={rowData.item.sign} />
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.blankView} />
          <TouchableOpacity style={styles.evergreenView} activeOpacity={0.6}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.logoImage} source={Images.logo} />
              <Text style={styles.textStyle}>{Strings.evergreen_rewards}</Text>
            </View>
            <Image style={styles.arrowImage} source={Images.arrow} />
          </TouchableOpacity>
          <View style={[styles.blankView, {marginVertical: vw(18)}]} />
          <FlatList
            bounces={false}
            data={newData}
            keyExtractor={(index: any) => index.toString()}
            renderItem={rData => {
              return (
                <TouchableOpacity style={styles.lastView}>
                  <Image
                    style={styles.imgStyle}
                    source={rData.item.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.textStyle}>{rData.item.title}</Text>
                  {rData.item.var ? (
                    <View style={styles.circleView} />
                  ) : (
                    <View style={styles.newView}>
                      <Text style={styles.newText}>NEW</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: vw(117),
  },
  commonView: {
    flexDirection: 'row',
    paddingLeft: vw(20),
    marginTop: vw(30),
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: vw(23),
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
    marginRight: vw(20),
  },
  blankView: {
    width: vw(375),
    height: vw(20),
    marginVertical: vw(30),
    backgroundColor: '#f8f8f8',
  },
  evergreenView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vw(18),
    paddingLeft: vw(20),
  },
  logoImage: {
    width: vw(30),
    height: vw(30),
  },
  lastView: {
    flexDirection: 'row',
    paddingLeft: vw(20),
    marginTop: vw(30),
  },
  circleView: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    backgroundColor: Colors.red,
    marginLeft: vw(5),
    alignSelf: 'center',
  },
  newView: {
    width: vw(50),
    height: vw(20),
    borderRadius: vw(11),
    marginLeft: vw(10),
    backgroundColor: Colors.yellow,
  },
  newText: {
    fontSize: vw(15),
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center',
  },
  //   newImgStyle: {
  //     width: vw(17),
  //     height: vw(24),
  //   },
});
