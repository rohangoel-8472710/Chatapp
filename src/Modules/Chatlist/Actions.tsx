import {UPDATE_USERDETAILS} from './Type';

export const updateUserdetails = (value: any) => {
  return (dispatch: any) => {
    dispatch({type: UPDATE_USERDETAILS, payload: {data: value}});
  };
};
