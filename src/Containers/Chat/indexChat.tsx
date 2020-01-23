import {connect} from 'react-redux';
import Chat from './Chat';
import {} from '../../Modules/Signin/Actions';
const mapDispatchToProps = (dispatch: Function) => ({});
const mapStateToProps = (state: any) => {
  const {user} = state.Chatlist;
  console.warn('user  ',user)
  return {
    user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
