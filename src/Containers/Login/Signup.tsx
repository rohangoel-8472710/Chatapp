import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
//import {styles} from '../../styles/styles';
import styles from '../Login/styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';
import ImagePicker from 'react-native-image-crop-picker';
export interface Props {
  navigation: any;
}

interface State {
  email: string;
  password: string;
  name: string;
  sourceimg: string;
  submitDisabled: boolean;
  uid: string;
  showpassword: boolean;
  isChecked: boolean;
}
export default class Signup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      sourceimg: '',
      showpassword: false,
      submitDisabled: true,
      uid: '',
      isChecked: false,
    };
  }
  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };
  onImageUpload = () => {
    console.warn('ok');
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      // console.log("ImagePath ", image.path);
      this.setState({sourceimg: image.path});
    });
  };
  onsignup = () => {
    console.warn(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.sourceimg,
    );
    try {
      let user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        sourceimg: this.state.sourceimg,
      };
      Firebaseservices.createAccount(
        this.state.email,
        this.state.password,
        this.loginsuccess,
        this.loginfailed,
      );
    } catch ({message}) {
      console.log('account creation failed.catch error:' + message);
    }
    // Firebaseservices.writedata(this.state.name, )
  };

  loginsuccess = (data: any) => {
    console.warn(data.user.uid);
    this.setState({
      uid: data.user.uid,
    });
    console.warn('Login successfull');
    let user = {
      uid: data.user.uid,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    Firebaseservices.writedata(user);
    this.props.navigation.navigate('Chatlist', {
      name: this.state.name,
      email: this.state.email,
      uid: this.state.uid,
      Avatar: this.state.sourceimg,
    });
  };
  loginfailed = () => {
    alert('Login Failed');
  };

  onChangeEmail = (email: string) => this.setState({email});
  onChangePassword = (password: string) => this.setState({password});
  onChangeName = (name: string) => this.setState({name});

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.backview}
          onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.BackButton} style={styles.backButtonImage} />
          <Text style={styles.signin}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signUP}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <Image source={Images.icSlection} style={styles.icSlection} />
          <Text style={styles.detailsText}>
            {' '}
            Please fill the details below{' '}
          </Text>
        </View>

        <View style={styles.Uploadview}>
          <Image
            style={styles.uploadimage}
            resizeMode="contain"
            source={
              this.state.sourceimg === ''
                ? Images.PROFILE
                : {uri: this.state.sourceimg}
            }
          />
          <TouchableOpacity
            style={styles.editimage}
            onPress={() => this.onImageUpload()}>
            <Image source={Images.EDIT} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputsignup}
          placeholder="Name"
          // placeholderTextColor="#9a73ef"
          onChangeText={this.onChangeName}
          value={this.state.name}
          autoCapitalize="none"
          keyboardAppearance="light"
          returnKeyLabel="Next"
          returnKeyType="next"
          keyboardType="default"
        />
        <TextInput
          style={styles.inputsignup}
          placeholder="Email"
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.onChangeEmail}
          value={this.state.email}
          keyboardAppearance="light"
          returnKeyLabel="Next"
          returnKeyType="next"
          keyboardType="email-address"
        />
        <View>
          <TextInput
            style={styles.inputsignup}
            placeholder="Password"
            // placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.onChangePassword}
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
          style={styles.ButtonSignUp}
          onPress={() => this.onsignup()}>
          <Text style={styles.ButtonText}>Signup</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.ButtonUploadIamge}
          onPress={() => this.onImageUpload()}>
          <Text style={styles.ButtonText}>Upload Image</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
