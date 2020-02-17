import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ImagePicker from '../../../Components/ImagePicker';
import Styles from './Styles';
import {Dropdown} from 'react-native-material-dropdown';
export interface AppProps {
  navigate?: any;
}

export interface AppState {
  imageSource: string;
  textResult: any;
  status: boolean;
  translatedText: any;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      imageSource: '',
      textResult: null,
      status: true,
      translatedText: null,
    };
  }

  imagepicker = () => {
    ImagePicker.GetPic((response: any) => {
      this.setState(
        {
          imageSource:
            Platform.OS === 'ios' ? 'file:///' + response.path : response.path,
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
    });
  };
  Translate = async () => {
    let result = await new Promise((resolve, reject) => {
      NativeModules.TextRecognition.translate(
        {
          imageSource: this.state.textResult,
        },
        (source: any) => {
          resolve(source);
        },
      );
    });
    this.setState({
      translatedText: result,
    });
  };

  public render() {
    return (
      <View style={Styles.parent}>
        {this.state.status && (
          <View>
            <TouchableOpacity onPress={() => this.imagepicker()}>
              <Text style={Styles.Text}>Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
        {!this.state.status && (
          <View>
            <TouchableOpacity
              onPress={() =>
                this.setState({status: !this.state.status, textResult: ''})
              }
              style={Styles.newView}>
              {/* <Text style={Styles.Text}>Try Another</Text> */}
            </TouchableOpacity>
            {this.state.textResult !== '' ? (
              <ScrollView>
                <Text style={Styles.resultText}>{this.state.textResult}</Text>
              </ScrollView>
            ) : null}
            <TouchableOpacity
              onPress={() => this.Translate()}
              style={Styles.newView}>
              <Text style={Styles.Text}>Translate</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
