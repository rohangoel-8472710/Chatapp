import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
//import {styles} from '../../styles/styles';
import styles from '../Login/styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';

export interface Props {
  navigation: any;
}

interface State {
  name: string;
  uid: string;
  email: string;
  password: string;
  message: string;
  showpassword: boolean;
}
export default class Signin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      uid: '',
      message: '',
      showpassword: false,
    };
  }
  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };

  loginsuccess = (data: any) => {
    console.warn(data.user.uid);
    this.setState({
      uid: data.user.uid,
    });
    console.warn('Login successfull');
    // Firebaseservices.writeinboxdata(
    //   data.user.id,
    //   this.state.email,
    //   this.state.message,
    // );
    this.props.navigation.navigate('Chatlist', {
      name: this.state.name,
      email: this.state.email,
      uid: this.state.uid,
    });
  };
  loginfailed = () => {
    alert('Login Failed');
  };

  onChangeEmail = (email: string) => this.setState({email});
  onChangePassword = (password: string) => this.setState({password});

  render() {
    return (
      <View style={styles.main}>
        {/* <TouchableOpacity
          style={styles.signUPbtn}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.signUpTextbtn}>Sign Up</Text>
        </TouchableOpacity> */}
        <View style={styles.signIN}>
          <Text style={styles.signUpText}>Sign In</Text>
          <Image source={Images.icSlection} style={styles.icSlection} />
          <Text style={styles.detailsText}> Welcome to ChatApplication </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          //placeholderTextColor="#9a73ef"
          onChangeText={this.onChangeEmail}
          autoCapitalize="none"
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            //placeholderTextColor="#9a73ef"
            onChangeText={this.onChangePassword}
            autoCapitalize="none"
            value={this.state.password}
            keyboardAppearance="light"
            secureTextEntry={!this.state.showpassword}
            returnKeyType="done"
            returnKeyLabel="Submit"
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={() => this.showPassword(!this.state.showpassword)}>
            <Image
              source={
                this.state.showpassword ? Images.eyeEnabled : Images.eyeDisabled
              }
              style={styles.eyeOpen}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() =>
            Firebaseservices.onPressLogin(
              this.state.email,
              this.state.password,
              this.loginsuccess,
              this.loginfailed,
            )
          }
          activeOpacity={0.8}>
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.ButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
