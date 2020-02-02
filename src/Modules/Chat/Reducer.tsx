import { IS_TYPING } from './Type';
const initialState = {
    isTyping: false,
}

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case IS_TYPING:
            return { ...state, isTyping: action.payload.data }
        default:
            return state
    }
}

export default Reducer;