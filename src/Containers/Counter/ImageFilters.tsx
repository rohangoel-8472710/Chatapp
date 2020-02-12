import React, {Component} from 'react';
import {
  Button,
  FlatList,
  Image,
  NativeModules,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import ImagePicker from '../../Components/ImagePicker';
import {vh} from '../../Constants/Dimensions';
export interface AppProps {}
export interface AppState {
  imgSource: string;
  imgArraySource: Array<any>;
}

export default class AppComponent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      imgSource: '',
      imgArraySource: [],
    };
  }

  imageFillter = async (i: number) => {
    console.warn('ok');

    let result = await new Promise((resolve, reject) => {
      console.warn('filter=>', i);

      NativeModules.RNImageFilter.getSourceImage(
        {
          imgSource: this.state.imgSource,
          dataType: 'Path',
          filterType: i,
        },
        (source: any) => {
          resolve(source.base64);
          console.warn('ImageFIlter->', source);
        },
      );
    });
    return result;
  };

  onPress = () => {
    ImagePicker.GetPic((response: any) => {
      this.setState({
        imgSource: Platform.OS === 'ios' ? 'file:///' + response : response,
      });
    });
  };

  FilterImage = async () => {
    console.warn('img ', this.state.imgSource);
    if (!this.state.imgSource) {
      alert('Please choose image');
    } else {
      let tempArray: Array<any> = [];
      for (let i = 0; i < 10; i++) {
        let data = await this.imageFillter(i);
        tempArray.push({
          FillterImage: Platform.OS === 'ios' ? data : 'file://' + data,
        });
        console.warn('filterimage', this.FilterImage);
      }

      this.setState(
        {
          imgArraySource: tempArray,
        },
        () => {},
      );
    }
  };
  onImagePress = (FillterImage: string) => {
    this.setState({
      imgSource: FillterImage,
    });
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={{uri: this.state.imgSource}}
          style={{height: 300, width: 300, marginTop: vh(30)}}
        />
        <Button title={'pressMe'} onPress={() => this.onPress()} />
        <Button title={'FilterImage'} onPress={() => this.FilterImage()} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          data={this.state.imgArraySource}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.onImagePress(item.FillterImage)}
              style={{alignItems: 'center'}}>
              <Image
                source={{uri: item.FillterImage}}
                style={{height: 100, width: 100}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
