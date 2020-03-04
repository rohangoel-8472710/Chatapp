import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Image,
  TextInput,
} from 'react-native';

/*
 ** Custom Imports
 */
import {vw, vh} from '../../Constants/Dimensions';
import Images from '../../Constants/Images';
import Colors from '../../Constants/Colors';
import CommonContinueButton from '../../Components/CommonContinueButton';
interface Props {
  navigation?: any;
}
interface State {
  ModalVisible: boolean;
}

export default class ModalTester extends Component<Props, State> {
  state = {
    ModalVisible: false,
  };

  setModalVisible(visible: any) {
    this.setState({ModalVisible: visible});
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '',
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal is closed');
          }}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                opacity: 0.5,
              }}>
              {/* <Text>Hello</Text>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.ModalVisible)}>
                <Text>Hide Modal</Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                ...styles.modalView,
                backgroundColor: 'white',
                flex: 2,
                opacity: 1,
              }}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(false)}
                style={styles.cancelButton}>
                <Image style={styles.cancelImgStyle} source={Images.cancel} />
              </TouchableOpacity>
              <Text style={styles.loginText}>LOGIN</Text>
              <View style={styles.TextInputView}>
                <Text style={styles.mobileNumberText}>MOBILE NUMBER</Text>
                <TextInput style={styles.input} />
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
                <TouchableOpacity>
                  <Image style={styles.imgStyle} source={Images.facebook} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.imgStyle} source={Images.google} />
                </TouchableOpacity>
              </View>
              <Text style={styles.newText}>
                New at Seniority?{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => this.props.navigation.navigate()}>
                  SIGN UP
                </Text>
              </Text>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    width: vw(375),
    flex: 1,
    backgroundColor: 'grey',
    height: vw(492),
    borderTopLeftRadius: vw(20),
    borderTopRightRadius: vw(20),
  },
  cancelImgStyle: {
    width: vw(20),
    height: vw(20),
  },
  cancelButton: {
    alignItems: 'flex-end',
    marginRight: vw(22),
    marginTop: vw(22),
  },
  loginText: {
    fontSize: vw(20),
    fontWeight: '600',
    color: Colors.black,
    marginVertical: vw(13),
    textAlign: 'center',
  },
  TextInputView: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: vw(60),
    width: vw(274),
    borderColor: Colors.inputgrey,
  },
  input: {
    backgroundColor: 'transparent',
  },
  mobileNumberText: {
    color: Colors.grey,
    fontSize: vw(15),
    fontWeight: '500',
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
    marginVertical: vw(31),
  },
  signUpText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.green,
  },
});
