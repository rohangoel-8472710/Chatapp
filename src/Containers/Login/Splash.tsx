import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {vw, vh} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
import Images from '../../Constants/Images';
import CommonContinueButton from '../../Components/CommonContinueButton';
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.loginText}>LOGIN</Text>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.input}
            placeholder="MOBILE NUMBER"
            placeholderTextColor={Colors.grey}
          />
        </View>
        <View style={styles.continueButtonView}>
          <CommonContinueButton />
          <Text style={styles.continuingText}>
            By continuing, I agree to{' '}
            <Text style={styles.privacyText}>PRIVACY POLICY</Text>
          </Text>
        </View>
        <View style={styles.middleView}>
          <View style={styles.border} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.border} />
        </View>
        <View style={styles.buttonView}>
          <Image style={styles.imgStyle} source={Images.facebook} />
          <Image style={styles.imgStyle} source={Images.google} />
        </View>
        <Text style={styles.newText}>
          New at Seniority? <Text style={styles.signUpText}>SIGN UP</Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: vh(90),
  },
  TextInputView: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: vh(60),
    width: vw(274),
  },
  input: {
    fontSize: vw(15),
    fontWeight: '500',
    marginBottom: vh(15),
  },
  continueButtonView: {
    alignItems: 'center',
    marginVertical: vw(30),
  },
  continuingText: {
    color: Colors.lightgrey,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: vw(15),
    marginTop: vh(15),
  },
  privacyText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.green,
  },
  middleView: {
    flexDirection: 'row',
    // marginVertical: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: vw(41),
    height: vh(1),
    backgroundColor: Colors.lightestgrey,
  },
  orText: {
    fontSize: vw(13),
    fontWeight: '500',
    color: Colors.lightgrey,
    padding: vw(8),
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: vw(180),
    marginVertical: vh(20),
  },
  imgStyle: {
    width: vw(80),
    height: vh(40),
    borderRadius: vw(100),
  },
  newText: {
    fontSize: vw(15),
    fontWeight: 'normal',
    color: Colors.lightgrey,
    textAlign: 'center',
    marginVertical: vh(31),
  },
  signUpText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.green,
  },
});
