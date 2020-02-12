import {connect} from 'react-redux';
import Chat from './Chat';
import {
  isTyping,
  addImages,
  removeImages,
  clearImages,
  showingFooter,
  changeCurrentImage,
  hideFooter,
  addVideo,
  removeVideo,
  uploadAndSendVideo,
} from '../../Modules/Chat/Action';
const mapDispatchToProps = (dispatch: Function) => ({
  isTyping: () => dispatch(isTyping()),
  addImages: (data: any) => dispatch(addImages(data)),
  showingFooter: () => dispatch(showingFooter()),
  removeImages: () => dispatch(removeImages()),
  clearImages: () => dispatch(clearImages()),
  hideFooter: () => dispatch(hideFooter()),
  changeCurrentImage: (value: string, callback: Function) =>
    dispatch(changeCurrentImage(value, callback)),
  addVideo: (data: any) => dispatch(addVideo(data)),
  removeVideo: (callback: Function) => dispatch(removeVideo(callback)),
  uploadAndSendVideo: (
    roomID: string,
    userID: string,
    ref: any,
    callback: Function,
  ) => dispatch(uploadAndSendVideo(roomID, userID, ref, callback)),
});
const mapStateToProps = (state: any) => {
  const {
    isTyping,
    images,
    showFooter,
    currentImg,
    videoURL,
    currentVideo,
    sendingVideoURL,
  } = state.Chat;
  const {user} = state.Chatlist;
  return {
    user,
    isTyping,
    images,
    showFooter,
    currentImg,
    videoURL,
    currentVideo,
    sendingVideoURL,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
