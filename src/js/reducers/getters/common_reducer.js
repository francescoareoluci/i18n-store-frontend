import { updateStateObject } from "../state_utils";
import { 
    GET_PRODUCT_LIST,
    GET_SIMILAR_PRODUCTS,
    PERFORM_SEARCH
} from "../../constants/action_types";


const initialState = {
    productList: [],
    similarProductList: []
}

export function commonReducer(state = initialState, action) {
    if (action.type == GET_PRODUCT_LIST || action.type == PERFORM_SEARCH) {
        return updateStateObject(state, { productList: action.payload });
    }
    if (action.type == GET_SIMILAR_PRODUCTS) {
        return updateStateObject(state, { similarProductList: action.payload  });
    }
    
    return state;
}