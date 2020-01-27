import ImagePicker from 'react-native-image-crop-picker';

const Picker = {
  GetPic: (callback: Function) => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image: {path: any}) => {
      callback(image.path);
    });
  },

  getCamera: (callback: Function) => {
    ImagePicker.openCamera({
      cropping: true,
    }).then((image: {path: any}) => {
      callback(image.path);
    });
  },
};
export default Picker;
