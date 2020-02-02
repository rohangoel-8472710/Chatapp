import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import styles from './styles';
import {ImagePicker} from '../../Components';
import Images from '../../Constants/Images';
import Colors from '../../Constants/Colors';
interface AppProps {
  visible?: boolean;
  Action: Function;
  image?: any;
  gpName: Function;
}

interface AppState {
  source: string;
  Border: number;
  gpName: string;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      source: '',
      Border: 0,
      gpName: '',
    };
  }

  imagepicker = () => {
    ImagePicker.GetPic((response: string) => {
      this.setState({
        source: response,
      });
    });
  };

  public render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}>
        <TouchableOpacity
          onPress={() => this.props.Action()}
          style={styles.Container}>
          <TouchableOpacity style={styles.modalview}>
            <TouchableOpacity
              style={styles.imgstyle}
              onPress={() => this.imagepicker()}>
              {this.state.source === '' ? (
                <Image
                  source={Images.PROFILE}
                  resizeMode="cover"
                  style={styles.IMGstyle}
                />
              ) : (
                <Image
                  source={{uri: this.state.source}}
                  resizeMode="cover"
                  style={styles.IMGstyle}
                />
              )}
              <Image source={Images.EDIT} style={styles.edit} />
            </TouchableOpacity>
            <TextInput
              placeholder="Enter Group Name"
              style={[
                styles.input,
                {
                  borderColor:
                    this.state.Border === 1
                      ? Colors.tealBlue
                      : Colors.textInput,
                },
              ]}
              onChangeText={(text: string) => {
                this.props.gpName(text), this.setState({gpName: text});
              }}
              returnKeyType="done"
              autoCorrect={false}
              keyboardType="default"
              onFocus={() => this.setState({Border: 1})}
              onBlur={() => this.setState({Border: 0})}
            />
            <View style={styles.ModalButtonView}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => this.props.Action()}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() =>
                  this.state.gpName === ''
                    ? null
                    : this.props.image(this.state.source)
                }>
                <Text
                  style={[
                    styles.btnText2,
                    this.state.gpName === ''
                      ? {color: Colors.fadedGray}
                      : {color: Colors.tealBlue},
                  ]}>
                  Create Group
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}
