import {
  IS_TYPING,
  MULTI_PICS,
  REMOVE_PICS,
  SHOW_FOOTER,
  CLEAR_PICS,
  HIDE_FOOTER,
  CURRENT_IMAGE,
  URL_VIDEO,
  ADD_VIDEO,
  CURRENT_VIDEO,
  URL_IMAGE,
} from './Type';
import Firebaseservices from '../../utils/FirebaseServices';

export const isTyping = () => {
  return (dispatch: any, getState: any) => {
    const {isTyping} = getState().Chatlist;
    dispatch({type: IS_TYPING, payload: {data: !isTyping}});
  };
};

export const addImages = (values: Object) => {
  return (dispatch: any, getState: any) => {
    const {images} = getState().Chat;
    images.push(values);
    dispatch({type: MULTI_PICS, payload: {data: images}});
  };
};

export const removeImages = () => {
  return (dispatch: any, getState: any) => {
    const {images} = getState().Chat;
    var pics = images.slice(1);
    dispatch({type: REMOVE_PICS, payload: {data: pics}});
  };
};

export const showingFooter = () => {
  return (dispatch: any) => {
    dispatch({type: SHOW_FOOTER, payload: {data: true}});
  };
};

export const hideFooter = () => {
  return (dispatch: any) => {
    dispatch({type: HIDE_FOOTER, payload: {data: false}});
  };
};

export const clearImages = () => {
  return (dispatch: any) => {
    dispatch({type: CLEAR_PICS, payload: {data: []}});
  };
};

export const changeCurrentImage = (image: string, callback: Function) => {
  return (dispatch: any) => {
    dispatch({type: CURRENT_IMAGE, payload: {data: image}});
    if (callback) {
      callback();
    }
  };
};

export const addVideo = (values: Object) => {
  return (dispatch: any) => {
    dispatch({type: ADD_VIDEO, payload: {data: values}});
  };
};

export const removeVideo = (callback: Function) => {
  return (dispatch: any) => {
    dispatch({type: URL_VIDEO, payload: {data: ''}});
    dispatch({type: ADD_VIDEO, payload: {data: ''}});
    if (callback) {
      callback();
    }
  };
};

export const uploadAndSendVideo = (
  roomID: string,
  userID: string,
  ref: any,
  callback: Function,
) => {
  return (dispatch: any, getState: any) => {
    const {videoURL} = getState().Chat;
    if (videoURL.roomID === roomID && videoURL.userID === userID) {
      dispatch({type: CURRENT_VIDEO, payload: {data: videoURL.video}});
      Firebaseservices.uploadMsgVideo(
        videoURL.video,
        (url: string, name: string) => {
          dispatch({type: URL_VIDEO, payload: {data: url}});
          ref.onSend({text: ''}, true);
          callback();
        },
      );
    }
  };
};
