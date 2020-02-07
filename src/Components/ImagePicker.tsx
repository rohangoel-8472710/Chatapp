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
      compressImageQuality: 0.1,
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
      compressVideoPreset: 'Passthrough',
    }).then((video: {path: string}) => {
      callback(video.path);
    });
  },
};
export default Picker;
