import { updateStateObject } from "../state_utils";
import { 
    LOGIN, 
    SET_TOKEN, 
    UNAUTH 
} from "../../constants/action_types";


const initialState = {
    token: "",
    role: "",
    language: "en",
    unauth: false
}

export function authReducer(state = initialState, action) {
    if (action.type == LOGIN || action.type == SET_TOKEN) {
        if (Object.keys(action.payload).length == 0) {
            return initialState;
        }

        return updateStateObject(state, {
            token: action.payload.token,
            role: action.payload.role,
            language: action.payload.language
        });
    }
    else if (action.type == UNAUTH) {
        return updateStateObject(state, {unauth: action.payload.unauth})
    }

    return state;
}