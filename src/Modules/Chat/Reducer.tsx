import {IS_TYPING, MULTI_PICS, REMOVE_PICS, SHOW_FOOTER} from './Type';
const initialState = {
  isTyping: false,
  images: [],
  showFooter: false,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IS_TYPING:
      return {...state, isTyping: action.payload.data};
    case MULTI_PICS || REMOVE_PICS:
      return {...state, images: action.payload.data};
    case SHOW_FOOTER:
      return {...state, showFooter: action.payload.data};
    default:
      return state;
  }
};

export default Reducer;
