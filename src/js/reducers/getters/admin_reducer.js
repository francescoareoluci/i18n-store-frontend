import { updateStateObject } from "../state_utils";
import { 
    CHANGE_ADMIN_SELECTED_PRODUCT,
    GET_USERS,
    GET_CURRENCIES,
    GET_MANUFACTURERS,
    GET_LOCALES,
} from "../../constants/action_types";


const initialState = {
    adminSelectedProduct: {},
    userList: {},
    currencyList: {},
    manufacturerList: {},
    localeList: {},
}

export function adminReducer(state = initialState, action) {
    if (action.type == CHANGE_ADMIN_SELECTED_PRODUCT) {
        return updateStateObject(state, { adminSelectedProduct: action.payload });
    }
    else if (action.type == GET_USERS) {
        return updateStateObject(state, { userList: action.payload });
    }
    else if (action.type == GET_CURRENCIES) {
        return updateStateObject(state, { currencyList: action.payload });
    }
    else if (action.type == GET_MANUFACTURERS) {
        return updateStateObject(state, { manufacturerList: action.payload });
    }
    else if (action.type == GET_LOCALES) {
        return updateStateObject(state, { localeList: action.payload });
    }

    return state;
}