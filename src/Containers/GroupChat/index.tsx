import {connect} from 'react-redux';
import Group from './Group';
import {} from '../../Modules/Chatlist/Actions';

const mapDispatchToProps = (dispatch: Function) => ({});

const mapStateToProps = (state: any) => {
  const {user} = state.Chatlist;
  return {
    user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
