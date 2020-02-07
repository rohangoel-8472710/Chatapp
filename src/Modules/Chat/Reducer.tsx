import {
  IS_TYPING,
  MULTI_PICS,
  REMOVE_PICS,
  SHOW_FOOTER,
  CLEAR_PICS,
  HIDE_FOOTER,
  CURRENT_IMAGE,
  URL_VIDEO,
} from './Type';
const initialState = {
  isTyping: false,
  images: [],
  showFooter: false,
  currentImg: '',
  videoURL: '',
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IS_TYPING:
      return {...state, isTyping: action.payload.data};
    case MULTI_PICS:
      return {...state, images: action.payload.data};
    case SHOW_FOOTER:
      return {...state, showFooter: action.payload.data};
    case CLEAR_PICS:
      return {...state, images: action.payload.data};
    case HIDE_FOOTER: {
      return {...state, showFooter: action.payload.data};
    }
    case CURRENT_IMAGE: {
      return {...state, currentImg: action.payload.data};
    }
    case REMOVE_PICS: {
      return {...state, images: action.payload.data};
    }
    case URL_VIDEO: {
      return {...state, videoURL: action.payload.data};
    }
    default:
      return state;
  }
};

export default Reducer;
