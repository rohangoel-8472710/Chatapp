import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Constants/Colors';
export interface Props {
  navigation: any;
  updateEmail: Function;
  updateUid: Function;
}

interface State {
  name: string;
  uid: string;
  email: string;
  password: string;
  message: string;
  showpassword: boolean;
  avatar: string;
  animate: boolean;
  btndisable: boolean;
  bgBorder: number;
}
export default class SignIn extends React.Component<Props, State> {
  Input: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      uid: '',
      message: '',
      showpassword: false,
      avatar: '',
      animate: false,
      btndisable: true,
      bgBorder: 0,
    };
  }
  componentDidMount() {
    Firebaseservices.initializeFireBase();
  }

  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };

  onlogin = (email: string, password: string) => {
    this.setState({
      animate: true,
    });
    let user = {email: email, password: password};
    Firebaseservices.login(user, this.loginsuccess, this.loginfailed);
  };

  loginsuccess = (data: any) => {
    this.props.updateEmail(this.state.email);
    this.props.updateUid(data.user.uid);
    this.setState({
      animate: false,
    });
    this.props.navigation.navigate('Chatlist', {});
  };
  loginfailed = () => {
    this.setState({
      animate: false,
    });
    alert('Login Failed');
  };

  disableBtn = () => {
    const {email, password} = this.state;
    var val = true;
    email.length >= 6 && password.length >= 3 ? (val = false) : (val = true);
    return val;
  };
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.Graphicsview}>
          <Image source={Images.SignUpGraphic} style={styles.imagestyle} />
        </View>
        <TouchableOpacity
          style={styles.signUPbtn}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.signUpTextbtn}>Sign Up</Text>
        </TouchableOpacity>
        <SafeAreaView>
          <View style={styles.signIN}>
            <Text style={styles.signUpText}>Sign In</Text>
            <Image source={Images.icSlection} style={styles.icSlection} />
            <Text style={styles.detailsTextsignin}>
              Welcome to ChatApplication
            </Text>
          </View>
          <TextInput
            style={[
              styles.inputsignin,
              {
                borderColor:
                  this.state.bgBorder === 1
                    ? Colors.tealBlue
                    : Colors.fadedGray,
              },
            ]}
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text: string) =>
              this.setState({email: text, btndisable: this.disableBtn()})
            }
            autoCapitalize="none"
            onFocus={() => this.setState({bgBorder: 1})}
            onBlur={() => this.setState({bgBorder: 0})}
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => {
              this.Input.focus();
            }}
          />
          <View>
            <TextInput
              style={[
                styles.inputsignin,
                {
                  borderColor:
                    this.state.bgBorder === 2
                      ? Colors.tealBlue
                      : Colors.fadedGray,
                },
              ]}
              placeholder="Password"
              onChangeText={(text: string) =>
                this.setState({password: text, btndisable: this.disableBtn()})
              }
              autoCapitalize="none"
              value={this.state.password}
              keyboardAppearance="light"
              secureTextEntry={!this.state.showpassword}
              returnKeyType="done"
              keyboardType="default"
              onFocus={() => this.setState({bgBorder: 2})}
              onBlur={() => this.setState({bgBorder: 0})}
              onSubmitEditing={() =>
                this.onlogin(this.state.email, this.state.password)
              }
              ref={ref => {
                this.Input = ref;
              }}
            />
            <TouchableOpacity
              style={styles.eyesignin}
              onPress={() => this.showPassword(!this.state.showpassword)}>
              <Image
                source={
                  this.state.showpassword
                    ? Images.eyeEnabled
                    : Images.eyeDisabled
                }
                style={styles.eyeOpen}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.state.btndisable
                ? null
                : this.onlogin(this.state.email, this.state.password)
            }
            activeOpacity={0.8}>
            <LinearGradient
              style={[
                styles.submitButton,
                this.state.btndisable ? styles.disable : null,
              ]}
              colors={['#01a7a3', '#66eb8f']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}>
              <Text style={styles.ButtonText}>Submit</Text>
            </LinearGradient>
            <ActivityIndicator
              animating={this.state.animate}
              size={'large'}
              style={styles.indicator}
              color={Colors.tealBlue}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}
