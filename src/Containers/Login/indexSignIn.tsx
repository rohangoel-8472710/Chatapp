import {connect} from 'react-redux';
import SignIn from './SignIn';
import {updateUid, updateEmail} from '../../Modules/Signin/Actions';
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateEmail: (email: string) => dispatch(updateEmail(email)),
    updateUid: (uid: string) => dispatch(updateUid(uid)),
  };
};

const mapStateToProps = (state: any) => {
  const {uid, email} = state.SignIn;
  return {
    uid,
    email,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
