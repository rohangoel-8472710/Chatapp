import { combineReducers } from "redux";
import SignIn from '../Modules/Signin/Reducer';
import Chatlist from '../Modules/Chatlist/Reducer';

const reducer = combineReducers({
    SignIn,
    Chatlist,
});

export default reducer;