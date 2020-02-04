import {connect} from 'react-redux';
import Chat from './Chat';
import {
  isTyping,
  addImages,
  updateFooter,
  removeImages,
} from '../../Modules/Chat/Action';
const mapDispatchToProps = (dispatch: Function) => ({
  isTyping: () => dispatch(isTyping()),
  addImages: (data: any) => dispatch(addImages(data)),
  updateFooter: () => dispatch(updateFooter()),
  removeImages: () => dispatch(removeImages()),
});
const mapStateToProps = (state: any) => {
  const {isTyping, images, showFooter} = state.Chat;
  const {user} = state.Chatlist;
  return {
    user,
    isTyping,
    images,
    showFooter,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
