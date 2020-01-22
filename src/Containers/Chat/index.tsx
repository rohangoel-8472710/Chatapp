import {connect} from 'react-redux';
import Chatlist from '../Chat/Chatlist';
import {updateUserdetails} from '../../Modules/Chatlist/Actions';
const mapDispatchToProps = (dispatch: Function) => ({
  updateUserdetails: (user: any) => dispatch(updateUserdetails(user)),
});
const mapStateToProps = (state: any) => {
  const {uid, email} = state.SignIn;
  const {user} = state.ChatList;
  return {
    user,
    uid,
    email,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatlist);
