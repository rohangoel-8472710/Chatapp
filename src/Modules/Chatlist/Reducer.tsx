import { UPDATE_USERDETAILS } from './Type';
const initialState = {
    user: null
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_USERDETAILS:
            return { ...state, user: action.payload.data }
        default:
            return state
    }
}

export default Reducer;