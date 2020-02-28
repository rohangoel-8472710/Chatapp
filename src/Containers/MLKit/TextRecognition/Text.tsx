import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from '../../../Components/ImagePicker';
import Styles from './Styles';
import {Dropdown} from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
export interface AppProps {
  navigate?: any;
}

export interface AppState {
  imageSource: string;
  textResult: any;
  status: boolean;
  translatedText: any;
  language: number;
  animate: boolean;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      imageSource: '',
      textResult: null,
      status: true,
      translatedText: null,
      language: 11,
      animate: false,
    };
  }

  imagepicker = () => {
    ImagePicker.GetPic((response: any) => {
      this.setState(
        {
          imageSource: Platform.OS === 'ios' ? 'file:///' + response : response,
        },
        () => this.gettingText(),
      );
    });
  };

  gettingText = async () => {
    let result = await new Promise((resolve, reject) => {
      NativeModules.TextRecognition.getSourceImage(
        {
          imageSource: this.state.imageSource,
        },
        (source: any) => {
          resolve(source);
        },
      );
    });
    this.setState({
      textResult: result,
      status: !this.state.status,
      animate: false,
    });
  };
  Translate = async () => {
    let result = await new Promise((resolve, reject) => {
      NativeModules.TextRecognition.translate(
        {
          imageSource: this.state.textResult,
          language: this.state.language,
        },
        (source: any) => {
          resolve(source);
        },
      );
    });
    this.setState({
      translatedText: result,
      animate: false,
    });
    console.warn('Translated', result);
  };
  languageAlert = () => {
    Alert.alert(
      'Alert!',
      `Please select the Language`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  public render() {
    let data = [
      {value: 'Afrikaans'},
      {value: 'Arabic'},
      {value: 'Belarusian'},
      {value: 'Bulgarian'},
      {value: 'Bengali'},
      {value: 'Catalan'},
      {value: 'Czech'},
      {value: 'Welsh'},
      {value: 'Danish'},
      {value: 'German'},
      {value: 'Greek'},
      {value: 'English'},
      {value: 'Esperanto'},
      {value: 'Spanish'},
      {value: 'Estonian'},
      {value: 'Persian'},
      {value: 'Finnish'},
      {value: 'French'},
      {value: 'Irish'},
      {value: 'Galician'},
      {value: 'Gujarati'},
      {value: 'Hebrew'},
      {value: 'Hindi'},
      {value: 'Croatian'},
      {value: 'Haitian'},
      {value: 'Hungarian'},
      {value: 'Indonesian'},
      {value: 'Icelandic'},
      {value: 'Italian'},
      {value: 'Japanese'},
      {value: 'Georgian'},
      {value: 'Kannada'},
      {value: 'Korean'},
      {value: 'Lithuanian'},
      {value: 'Latvian'},
      {value: 'Macedonian'},
      {value: 'Marathi'},
      {value: 'Malay'},
      {value: 'Maltese'},
      {value: 'Dutch'},
      {value: 'Norwegian'},
      {value: 'Polish'},
      {value: 'Portuguese'},
      {value: 'Romanian'},
      {value: 'Russian'},
      {value: 'Slovak'},
      {value: 'Slovenian'},
      {value: 'Albanian'},
      {value: 'Swedish'},
      {value: 'Swahili'},
      {value: 'Tamil'},
      {value: 'Telugu'},
      {value: 'Thai'},
      {value: 'Tagalog'},
      {value: 'Turkish'},
      {value: 'Ukranian'},
      {value: 'Urdu'},
      {value: 'Vietnamese'},
      {value: 'Chinese'},
    ];
    return (
      <View style={Styles.parent}>
        <View style={Styles.upperView}>
          {this.state.status && (
            <>
              <TouchableOpacity onPress={() => this.imagepicker()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  styles={Styles.ButtonView}>
                  <Text style={Styles.Text}>Gallery</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
          {!this.state.status && (
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    status: !this.state.status,
                    textResult: null,
                    translatedText: null,
                    language: 11,
                  })
                }
                style={Styles.ButtonView}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  styles={Styles.ButtonView}>
                  <Text style={Styles.Text}>Try Again</Text>
                </LinearGradient>
              </TouchableOpacity>
              {this.state.textResult !== '' ? (
                <ScrollView style={Styles.resultTextView}>
                  <Text style={Styles.resultText}>{this.state.textResult}</Text>
                </ScrollView>
              ) : null}
            </View>
          )}
        </View>
        <View style={Styles.lowerView}>
          {!this.state.status && (
            <View>
              <Dropdown
                label="Language"
                data={data}
                onChangeText={(text: string, index: number) => {
                  this.setState({language: index});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.state.language === 11
                    ? this.languageAlert()
                    : this.setState({animate: true}, () => this.Translate());
                }}
                style={Styles.ButtonView}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  styles={Styles.ButtonView}>
                  <Text style={Styles.Text}>Translate</Text>
                </LinearGradient>
              </TouchableOpacity>
              {this.state.translatedText !== '' ? (
                <ScrollView style={Styles.resultTextView}>
                  <Text style={Styles.resultText}>
                    {this.state.translatedText}
                  </Text>
                </ScrollView>
              ) : null}
            </View>
          )}
        </View>
      </View>
    );
  }
}
