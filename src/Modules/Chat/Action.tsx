import {IS_TYPING, MULTI_PICS, REMOVE_PICS, SHOW_FOOTER} from './Type';

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

export const updateFooter = () => {
  return (dispatch: any, getState: any) => {
    const {showFooter} = getState().Chat;
    dispatch({type: SHOW_FOOTER, payload: {data: !showFooter}});
  };
};
