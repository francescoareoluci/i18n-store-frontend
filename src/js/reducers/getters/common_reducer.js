import { updateStateObject } from "../state_utils";
import { 
    GET_PRODUCT_LIST,
    PERFORM_SEARCH
} from "../../constants/action_types";


const initialState = {
    productList: []
}

export function commonReducer(state = initialState, action) {
    if (action.type == GET_PRODUCT_LIST || action.type == PERFORM_SEARCH) {
        return updateStateObject(state, { productList: action.payload });
    }
    
    return state;
}