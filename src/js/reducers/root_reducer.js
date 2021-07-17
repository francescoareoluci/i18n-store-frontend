/* Authentication */
import { 
    LOGIN, 
    SET_TOKEN, 
    LOGOUT, 
    UNAUTH 
} from "../constants/action_types";

/* Getters */
import { 
    GET_PRODUCT_LIST, 
    CHANGE_CUSTOMER_SELECTED_PRODUCT, 
    CHANGE_ADMIN_SELECTED_PRODUCT,
    GET_CART,
    GET_SHOPPING_LIST,
    GET_USERS,
    GET_CURRENCIES,
    GET_MANUFACTURERS,
    GET_LOCALES,
    PERFORM_SEARCH 
} from "../constants/action_types";

/* Notifications */
import { 
    ADD_PRODUCT_NOTIFICATION,
    ADD_PRODUCT_NOTIFICATION_ERROR,
    REMOVE_PRODUCT_NOTIFICATION,
    REMOVE_PRODUCT_NOTIFICATION_ERROR,
    ADD_PROD_TO_CART_NOTIFICATION,
    ADD_PROD_TO_CART_NOTIFICATION_ERROR,
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION,
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR,
    PERFORM_CHECKOUT_NOTIFICATION,
    PERFORM_CHECKOUT_NOTIFICATION_ERROR
} from "../constants/action_types";


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
    removeProductFromCartNotification: false,
    removeProductFromCartNotificationError: false,
    removeProductNotification: false,
    removeProductNotificationError: false,
    checkoutNotification: false,
    checkoutNotificationError: false,
    unauth: false
};

function rootReducer(state = initialState, action) {
    console.log(action);
    if (action.type == LOGIN || action.type == SET_TOKEN) {
        if (Object.keys(action.payload).length == 0) {
            return initialState;
        }

        const newState = Object.assign({}, state, {
            token: action.payload.token,
            role: action.payload.role,
            language: action.payload.language
        });
        return newState;
    }
    else if (action.type == LOGOUT) {
        return initialState;
    }
    else if (action.type == UNAUTH) {
        const newState = Object.assign({}, state, {
            unauth: action.payload.unauth
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
    else if (action.type == REMOVE_PRODUCT_NOTIFICATION) {
        const newState = Object.assign({}, state, {
            removeProductNotification: action.payload.removeProductNotification
        });
        return newState;
    }
    else if (action.type == REMOVE_PRODUCT_NOTIFICATION_ERROR) {
        const newState = Object.assign({}, state, {
            removeProductNotificationError: action.payload.removeProductNotificationError
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
    else if (action.type == REMOVE_PRODUCT_FROM_CART_NOTIFICATION) {
        const newState = Object.assign({}, state, {
            removeProductFromCartNotification: action.payload.removeProductFromCartNotification
        });
        return newState;
    }
    else if (action.type == REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR) {
        const newState = Object.assign({}, state, {
            removeProductFromCartNotificationError: action.payload.removeProductFromCartNotificationnError
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

    return state;
};

export default rootReducer;
