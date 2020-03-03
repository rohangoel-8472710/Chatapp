import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

/*
 ** Custom Imports
 */
import Strings from '../Constants/Strings';
import {vw, vh} from '../Constants/Dimensions';
import Colors from '../Constants/Colors';
export default class Privacy extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.privacyPolicyText}>{Strings.privacy_policy}</Text>
        <ScrollView
          style={{marginVertical: vw(30)}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.privacyDescriptionText}>
            {Strings.privacydescription}
          </Text>
          <TouchableOpacity style={styles.buttonView} activeOpacity={0.7}>
            <Text style={styles.understandButtonText}>
              {Strings.i_understand}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: vh(59),
  },
  privacyPolicyText: {
    fontSize: vw(20),
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
  },
  privacyDescriptionText: {
    fontSize: vw(16),
    fontWeight: 'normal',
    color: Colors.grey,
    width: vw(287),
    alignSelf: 'center',
    lineHeight: vw(20),
    // marginVertical: vw(30),
  },
  buttonView: {
    width: vw(275),
    height: vw(50),
    borderRadius: vw(5),
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: vw(74),
  },
  understandButtonText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.white,
  },
});
