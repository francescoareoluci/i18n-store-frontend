import { LOGIN } from "../constants/action_types"
import { LOGOUT } from "../constants/action_types"  
import { GET_PRODUCT_LIST } from "../constants/action_types"
import { CHANGE_CUSTOMER_SELECTED_PRODUCT } from "../constants/action_types"
import { CHANGE_ADMIN_SELECTED_PRODUCT } from "../constants/action_types"
import { GET_CART } from "../constants/action_types"
import { GET_SHOPPING_LIST } from "../constants/action_types"


const initialState = {
    token: "",
    role: "",
    customerSelectedProduct: {},
    adminSelectedProduct: {},
    productList: [],
    shoppingCart: {},
    shoppingList: {},
};

function rootReducer(state = initialState, action) {
    if (action.type == LOGIN) {
        const newState = Object.assign({}, state, {
            token: action.payload.token,
            role: action.payload.role
        });
        return newState;
    }
    else if (action.type == LOGOUT) {
        const newState = Object.assign({}, state, {
            token: "",
            role: "",
            customerSelectedProduct: {},
            adminSelectedProduct: {},
            productList: [],
            shoppingCart: {},
            shoppingList: {},
        });
        return newState;
    }
    else if (action.type == GET_PRODUCT_LIST) {
        const newState = Object.assign({}, state, {
            productList: action.payload
        });
        return newState;
    }
    else if (action.type == CHANGE_CUSTOMER_SELECTED_PRODUCT) {
        const newState = Object.assign({}, state, {
            customerSelectedProduct: action.payload
        });
        return newState;
    }
    else if (action.type == CHANGE_ADMIN_SELECTED_PRODUCT) {
        const newState = Object.assign({}, state, {
            adminSelectedProduct: action.payload
        });
        return newState;
    }
    else if (action.type == GET_CART) {
        const newState = Object.assign({}, state, {
            shoppingCart: action.payload
        });
        return newState;
    }
    else if (action.type == GET_SHOPPING_LIST) {
        const newState = Object.assign({}, state, {
            shoppingList: action.payload
        });
        return newState;
    }

    return state;
};

export default rootReducer;
