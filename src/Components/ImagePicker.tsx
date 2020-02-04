import ImagePicker from 'react-native-image-crop-picker';

const Picker = {
  GetPic: (callback: Function) => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image: {path: any}) => {
      callback(image.path);
    });
  },

  GetMultiplePic: (callback: Function) => {
    let temp: Array<string>;
    ImagePicker.openPicker({
      cropping: false,
      multiple: true,
    }).then((image: Array<any>) => {
      temp = image.map(item => item.path);
      callback(temp);
    });
  },

  getCamera: (callback: Function) => {
    ImagePicker.openCamera({
      cropping: true,
    }).then((image: {path: any}) => {
      callback(image.path);
    });
  },

  getVideo: (callback: Function) => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then((video: {path: string}) => {
      callback(video.path);
    });
  },
};
export default Picker;
