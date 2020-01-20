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
      const user = {
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
    Firebaseservices.writedata(data.user.uid, this.state.email);
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
  onChangeName = (name: string) => this.setState({name});

  render() {
    return (
      <ScrollView style={styles.main}>
        <View style={styles.signUP}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <Image source={Images.icSlection} style={styles.icSlection} />
          <Text style={styles.detailsText}>
            {' '}
            Please fill the details below{' '}
          </Text>
        </View>

        <View>
          <Image
            style={styles.uploadimage}
            resizeMode="contain"
            source={
              this.state.sourceimg === ''
                ? Images.PROFILE
                : {uri: this.state.sourceimg}
            }
          />
        </View>

        <TextInput
          style={styles.input}
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
          style={styles.input}
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
            style={styles.input}
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
        <TouchableOpacity style={styles.Button} onPress={() => this.onsignup}>
          <Text style={styles.ButtonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => this.onImageUpload()}>
          <Text style={styles.ButtonText}>Upload Avatar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
