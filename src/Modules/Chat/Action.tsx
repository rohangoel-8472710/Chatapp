import {IS_TYPING} from './Type';

export const isTyping = () => {
  return (dispatch: any, getState: any) => {
    const {isTyping} = getState().Chatlist;
    dispatch({type: IS_TYPING, payload: {data: !isTyping}});
  };
};
