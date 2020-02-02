import { combineReducers } from "redux";
import SignIn from '../Modules/Signin/Reducer';
import Chatlist from '../Modules/Chatlist/Reducer';
import Chat from '../Modules/Chat/Reducer';
const reducer = combineReducers({
    SignIn,
    Chatlist,
    Chat
});

export default reducer;