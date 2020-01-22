import { UPDATE_UID, UPDATE_EMAIL } from './Type'

export const updateEmail = (value: string) => {
    return (dispatch: any) => {
        dispatch({ type: UPDATE_EMAIL, payload: { data: value } });
    }
}
export const updateUid = (value: string) => {
    return (dispatch: any) => {
        dispatch({ type: UPDATE_UID, payload: { data: value } });
    }
}