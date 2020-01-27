import {UPDATE_EMAIL, UPDATE_UID} from './Type';
const initialState = {
  uid: '',
  email: '',
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_UID:
      return {...state, uid: action.payload.data};
    case UPDATE_EMAIL:
      return {...state, email: action.payload.data};
    default:
      return state;
  }
};

export default Reducer;
