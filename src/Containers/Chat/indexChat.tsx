import {connect} from 'react-redux';
import Chat from './Chat';
import {isTyping} from '../../Modules/Chat/Action';
const mapDispatchToProps = (dispatch: Function) => ({
  isTyping: () => dispatch(isTyping()),
});
const mapStateToProps = (state: any) => {
  const {isTyping} = state.Chat;
  const {user} = state.Chatlist;
  return {
    user,
    isTyping,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
