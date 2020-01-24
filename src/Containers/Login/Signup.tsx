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
import styles from './styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
export interface Props {
  navigation: any;
  updateEmail: Function;
  updateUid: Function;
}

interface State {
  email: string;
  password: string;
  name: string;
  source: string;
  submitDisabled: boolean;
  uid: string;
  showpassword: boolean;
  isChecked: boolean;
  borderemail: number;
  borderpassword: number;
  bordername: number;
}
export default class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      source: '',
      showpassword: false,
      submitDisabled: true,
      uid: '',
      isChecked: false,
      borderemail: 0,
      borderpassword: 0,
      bordername: 0,
    };
  }
  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };
  onImageUpload = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      // console.log("ImagePath ", image.path);
      this.setState({source: image.path});
    });
  };
  onsignup = () => {
    try {
      let user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      Firebaseservices.signUp(user, this.loginsuccess, this.loginfailed);
    } catch ({message}) {
      console.log('account creation failed.catch error:' + message);
    }
    // Firebaseservices.writedata(this.state.name, )
  };

  loginsuccess = (data: any) => {
    Firebaseservices.uploadImage(
      data.user.uid,
      this.state.source,
      (url: string) => {
        let user = {
          uid: data.user.uid,
          avatar: url,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        };
        Firebaseservices.addingUser(user);
      },
    );
    // console.warn(data.user.uid);
    // this.setState({
    //   uid: data.user.uid,
    // });
    this.props.updateEmail(this.state.email);
    this.props.updateUid(data.user.uid);
    // console.warn('Login successfull');
    this.props.navigation.navigate('Chatlist', {
      // name: this.state.name,
      // email: this.state.email,
      // uid: this.state.uid,
      // Avatar: this.state.sourceimg,
    });
  };
  loginfailed = () => {
    alert('Login Failed');
  };

  onChangeEmail = () => {
    let increaseBorder = this.state.borderemail;
    setTimeout(() => {
      if (this.state.email === '') {
        increaseBorder = 0;
        // console.warn('increaseBrderxdq', this.state.email);
      } else {
        increaseBorder++;
        // console.warn('increaseBorder', this.state.email);
      }

      this.setState({borderemail: increaseBorder});
    }, 100);
  };
  onChangePassword = () => {
    let increaseBorder = this.state.borderpassword;
    setTimeout(() => {
      if (this.state.password === '') {
        increaseBorder = 0;
      } else {
        increaseBorder++;
      }
      this.setState({borderpassword: increaseBorder});
    }, 100);
  };
  onChangeName = () => {
    let increaseBorder = this.state.bordername;
    setTimeout(() => {
      if (this.state.name === '') {
        increaseBorder = 0;
      } else {
        increaseBorder++;
      }
      this.setState({bordername: increaseBorder});
    }, 100);
  };

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
          <TouchableOpacity onPress={() => this.onImageUpload()}>
            <Image
              style={styles.uploadimage}
              resizeMode="contain"
              source={
                this.state.source === ''
                  ? Images.PROFILE
                  : {uri: this.state.source}
              }
            />
            <Image source={Images.EDIT} style={styles.editimage} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={[
            styles.inputsignup,
            {
              borderColor:
                this.state.bordername >= 1 ? Colors.tealBlue : Colors.fadedGray,
            },
          ]}
          placeholder="Name"
          // placeholderTextColor="#9a73ef"
          onChangeText={val => {
            this.setState({name: val});
            this.onChangeName();
          }}
          value={this.state.name}
          autoCapitalize="none"
          keyboardAppearance="light"
          returnKeyLabel="Next"
          returnKeyType="next"
          keyboardType="default"
          onFocus={() => this.setState({bordername: 1})}
          onBlur={() => this.setState({bordername: 0})}
        />
        <TextInput
          style={[
            styles.inputsignup,
            {
              borderColor:
                this.state.borderemail >= 1
                  ? Colors.tealBlue
                  : Colors.fadedGray,
            },
          ]}
          placeholder="Email"
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={val => {
            this.setState({email: val});
            this.onChangeEmail();
          }}
          value={this.state.email}
          keyboardAppearance="light"
          returnKeyLabel="Next"
          returnKeyType="next"
          keyboardType="email-address"
          onFocus={() => this.setState({borderemail: 1})}
          onBlur={() => this.setState({borderemail: 0})}
        />
        <View>
          <TextInput
            style={[
              styles.inputsignup,
              {
                borderColor:
                  this.state.borderpassword >= 1
                    ? Colors.tealBlue
                    : Colors.fadedGray,
              },
            ]}
            placeholder="Password"
            // placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={val => {
              this.setState({password: val});
              this.onChangePassword();
            }}
            value={this.state.password}
            keyboardAppearance="light"
            secureTextEntry={!this.state.showpassword}
            returnKeyType="done"
            returnKeyLabel="Submit"
            keyboardType="default"
            onFocus={() => this.setState({borderpassword: 1})}
            onBlur={() => this.setState({borderpassword: 0})}
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
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onsignup()}>
          <LinearGradient
            style={styles.ButtonSignUp}
            colors={['#01a7a3', '#66eb8f']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}>
            <Text style={styles.ButtonText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
