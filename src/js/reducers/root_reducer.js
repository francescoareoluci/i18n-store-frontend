import { LOGIN } from "../constants/action_types"
import { SET_TOKEN } from "../constants/action_types"
import { LOGOUT } from "../constants/action_types"  
import { GET_PRODUCT_LIST } from "../constants/action_types"
import { CHANGE_CUSTOMER_SELECTED_PRODUCT } from "../constants/action_types"
import { CHANGE_ADMIN_SELECTED_PRODUCT } from "../constants/action_types"
import { GET_CART } from "../constants/action_types"
import { GET_SHOPPING_LIST } from "../constants/action_types"
import { GET_USERS } from "../constants/action_types"
import { GET_CURRENCIES } from "../constants/action_types"
import { GET_MANUFACTURERS } from "../constants/action_types"
import { GET_LOCALES } from "../constants/action_types"
import { PERFORM_SEARCH } from "../constants/action_types"


const initialState = {
    token: "",
    role: "",
    customerSelectedProduct: {},
    adminSelectedProduct: {},
    productList: [],
    shoppingCart: {},
    shoppingList: {},
    userList: {},
    currencyList: {},
    manufacturerList: {},
    localeList: {}
};

function rootReducer(state = initialState, action) {
    if (action.type == LOGIN || action.type == SET_TOKEN) {
        if (Object.keys(action.payload).length == 0) {
            const newState = Object.assign({}, state, {
                token: "",
                role: "",
                customerSelectedProduct: {},
                adminSelectedProduct: {},
                productList: [],
                shoppingCart: {},
                shoppingList: {},
                userList: {},
                currencyList: {},
                manufacturerList: {},
                localeList: {}
            });
            return newState;
        }

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
            userList: {},
            currencyList: {},
            manufacturerList: {},
            localeList: {}
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
    else if (action.type == GET_USERS) {
        const newState = Object.assign({}, state, {
            userList: action.payload
        });
        return newState;
    }
    else if (action.type == GET_CURRENCIES) {
        const newState = Object.assign({}, state, {
            currencyList: action.payload
        });
        return newState;
    }
    else if (action.type == GET_MANUFACTURERS) {
        const newState = Object.assign({}, state, {
            manufacturerList: action.payload
        });
        return newState;
    }
    else if (action.type == GET_LOCALES) {
        const newState = Object.assign({}, state, {
            localeList: action.payload
        });
        return newState;
    }
    else if (action.type == PERFORM_SEARCH) {
        const newState = Object.assign({}, state, {
            productList: action.payload
        });
        return newState;
    }

    return state;
};

export default rootReducer;
