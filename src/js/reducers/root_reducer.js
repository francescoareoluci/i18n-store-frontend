import { LOGIN, REMOVE_PROD_FROM_CART, SET_REMOVED_CART_PROD_LOADING } from "../constants/action_types"
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
import { ADD_PROD_TO_CART } from "../constants/action_types";
import { URL_CUSTOMER_REMOVE_PROD_FROM_CART } from "../constants/rest_api";
import { PERFORM_CHECKOUT_NOTIFICATION } from "../constants/action_types";
import { PERFORM_CHECKOUT_NOTIFICATION_ERROR } from "../constants/action_types";
import { UNAUTH } from "../constants/action_types";
import { REMOVE_PRODUCT } from "../constants/action_types";
import { SET_REMOVED_PROD_LOADING } from "../constants/action_types";
import { ADD_PROD_TO_CART_NOTIFICATION } from "../constants/action_types";
import { ADD_PROD_TO_CART_NOTIFICATION_ERROR } from "../constants/action_types";
import { ADD_PRODUCT_NOTIFICATION } from "../constants/action_types";
import { ADD_PRODUCT_NOTIFICATION_ERROR } from "../constants/action_types";

const initialState = {
    token: "",
    role: "",
    language: "en",
    customerSelectedProduct: {},
    adminSelectedProduct: {},
    productList: [],
    shoppingCart: {},
    shoppingList: {},
    userList: {},
    currencyList: {},
    manufacturerList: {},
    localeList: {},
    addProductNotification: false,
    addProductNotificationError: false,
    addCartProductNotification: false,
    addCartProductNotificationError: false,
    removeCartProductLoading: false,
    removeProductLoading: false,
    checkoutNotification: false,
    checkoutNotificationError: false,
    unauth: false
};

function rootReducer(state = initialState, action) {
    console.log(action);
    if (action.type == LOGIN || action.type == SET_TOKEN) {
        if (Object.keys(action.payload).length == 0) {
            const newState = Object.assign({}, state, {
                token: "",
                role: "",
                language: "en",
                customerSelectedProduct: {},
                adminSelectedProduct: {},
                productList: [],
                shoppingCart: {},
                shoppingList: {},
                userList: {},
                currencyList: {},
                manufacturerList: {},
                localeList: {},
                addProductNotification: false,
                addProductNotificationError: false,
                addCartProductNotification: false,
                addCartProductNotificationError: false,
                removeCartProductLoading: false,
                removeProductLoading: false,
                checkoutNotification: false,
                checkoutNotificationError: false,
                unauth: false
            });
            return newState;
        }

        const newState = Object.assign({}, state, {
            token: action.payload.token,
            role: action.payload.role,
            language: action.payload.language
        });
        return newState;
    }
    else if (action.type == LOGOUT) {
        const newState = Object.assign({}, state, {
            token: "",
            role: "",
            language: "en",
            customerSelectedProduct: {},
            adminSelectedProduct: {},
            productList: [],
            shoppingCart: {},
            shoppingList: {},
            userList: {},
            currencyList: {},
            manufacturerList: {},
            localeList: {},
            addProductNotification: false,
            addProductNotificationError: false,
            addCartProductNotification: false,
            addCartProductNotificationError: false,
            removeCartProductLoading: false,
            checkoutNotification: false,
            checkoutNotificationError: false,
            unauth: false
        });
        return newState;
    }
    else if (action.type == GET_PRODUCT_LIST || action.type == PERFORM_SEARCH) {
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
    else if (action.type == ADD_PROD_TO_CART_NOTIFICATION) {
        const newState = Object.assign({}, state, {
            addCartProductNotification: action.payload.addCartProductNotification
        });
        return newState;
    }
    else if (action.type == ADD_PROD_TO_CART_NOTIFICATION_ERROR) {
        const newState = Object.assign({}, state, {
            addCartProductNotificationError: action.payload.addCartProductNotificationError
        });
        return newState;
    }
    else if (action.type == REMOVE_PROD_FROM_CART || action.type == SET_REMOVED_CART_PROD_LOADING) {
        const newState = Object.assign({}, state, {
            removeCartProductLoading: action.payload.removeCartProductLoading
        });
        return newState;
    }
    else if (action.type == PERFORM_CHECKOUT_NOTIFICATION ) {
        const newState = Object.assign({}, state, {
            checkoutNotification: action.payload.checkoutNotification
        });
        return newState;
    }
    else if (action.type == PERFORM_CHECKOUT_NOTIFICATION_ERROR ) {
        const newState = Object.assign({}, state, {
            checkoutNotificationError: action.payload.checkoutNotificationError
        });
        return newState;
    }
    else if (action.type == UNAUTH) {
        const newState = Object.assign({}, state, {
            unauth: action.payload.unauth
        });
        return newState;
    }
    else if (action.type == REMOVE_PRODUCT || action.type == SET_REMOVED_PROD_LOADING) {
        const newState = Object.assign({}, state, {
            removeProductLoading: action.payload.removeProductLoading
        });
        return newState;
    }
    else if (action.type == ADD_PRODUCT_NOTIFICATION) {
        const newState = Object.assign({}, state, {
            addProductNotification: action.payload.addProductNotification
        });
        return newState;
    }
    else if (action.type == ADD_PRODUCT_NOTIFICATION_ERROR) {
        const newState = Object.assign({}, state, {
            addProductNotificationError: action.payload.addProductNotificationError
        });
        return newState;
    }

    return state;
};

export default rootReducer;
