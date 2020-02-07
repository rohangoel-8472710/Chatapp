import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';
import Colors from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {ImagePicker} from '../../Components';
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
  bgBorder: number;
  animate: boolean;
  btnDisable: boolean;
}
export default class SignUp extends React.Component<Props, State> {
  Input: any;
  Inputnext: any;
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
      bgBorder: 0,
      animate: false,
      btnDisable: true,
    };
  }
  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };

  imagePicker = () => {
    ImagePicker.GetPic((response: string) => {
      this.setState({
        source: response,
      });
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
  };

  loginsuccess = (data: any) => {
    debugger
    // console.warn(data.user.uid);
    
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
    this.props.updateEmail(this.state.email);
    this.props.updateUid(data.user.uid);
    this.props.navigation.navigate('Chatlist', {});
  }

  loginfailed = (err:string) => {
    debugger
    alert('Login Failed'+err);
  };

  disableBtn = () => {
    const {email, password, name} = this.state;
    var val = true;
    email.length >= 6 && password.length >= 3 && name.length >= 1
      ? (val = false)
      : (val = true);
    return val;
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
          <TouchableOpacity onPress={() => this.imagePicker()}>
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
                this.state.bgBorder === 1 ? Colors.tealBlue : Colors.fadedGray,
            },
          ]}
          placeholder="Name"
          onChangeText={(text: string) =>
            this.setState({name: text, btnDisable: this.disableBtn()})
          }
          value={this.state.name}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          keyboardType="default"
          onFocus={() => this.setState({bgBorder: 1})}
          onBlur={() => this.setState({bgBorder: 0})}
          onSubmitEditing={() => {
            this.Input.focus();
          }}
        />
        <TextInput
          style={[
            styles.inputsignup,
            {
              borderColor:
                this.state.bgBorder === 2 ? Colors.tealBlue : Colors.fadedGray,
            },
          ]}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text: string) =>
            this.setState({email: text, btnDisable: this.disableBtn()})
          }
          value={this.state.email}
          returnKeyType="next"
          keyboardType="email-address"
          onFocus={() => this.setState({bgBorder: 2})}
          onBlur={() => this.setState({bgBorder: 0})}
          ref={ref => {
            this.Input = ref;
          }}
          onSubmitEditing={() => {
            this.Inputnext.focus();
          }}
          autoCorrect={false}
        />
        <View>
          <TextInput
            style={[
              styles.inputsignup,
              {
                borderColor:
                  this.state.bgBorder === 3
                    ? Colors.tealBlue
                    : Colors.fadedGray,
              },
            ]}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text: string) =>
              this.setState({password: text, btnDisable: this.disableBtn()})
            }
            value={this.state.password}
            secureTextEntry={!this.state.showpassword}
            returnKeyType="done"
            keyboardType="default"
            onFocus={() => this.setState({bgBorder: 3})}
            onBlur={() => this.setState({bgBorder: 0})}
            ref={ref => {
              this.Inputnext = ref;
            }}
            autoCorrect={false}
            onSubmitEditing={() => this.onsignup()}
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
          activeOpacity={0.8}
          onPress={() => (this.state.btnDisable ? null : this.onsignup())}>
          <LinearGradient
            style={[
              styles.ButtonSignUp,
              this.state.btnDisable ? styles.disable : null,
            ]}
            colors={['#01a7a3', '#66eb8f']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}>
            <Text style={styles.ButtonText}>Signup</Text>
          </LinearGradient>
          <ActivityIndicator
            animating={this.state.animate}
            size={'large'}
            style={styles.indicator}
            color={Colors.tealBlue}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
