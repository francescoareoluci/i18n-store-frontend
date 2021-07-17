import { updateStateObject } from "../state_utils";
import { 
    CHANGE_CUSTOMER_SELECTED_PRODUCT,
    GET_CART,
    GET_SHOPPING_LIST,
} from "../../constants/action_types";


const initialState = {
    customerSelectedProduct: {},
    shoppingCart: {},
    shoppingList: {}
}

export function customerReducer(state = initialState, action) {
    if (action.type == CHANGE_CUSTOMER_SELECTED_PRODUCT) {
        return updateStateObject(state, { customerSelectedProduct: action.payload });
    }
    else if (action.type == GET_CART) {
        return updateStateObject(state, { shoppingCart: action.payload });
    }
    else if (action.type == GET_SHOPPING_LIST) {
        return updateStateObject(state, { shoppingList: action.payload });
    }

    return state;
}