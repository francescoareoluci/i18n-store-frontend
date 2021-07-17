import { updateStateObject } from "../state_utils";
import {
    ADD_PROD_TO_CART_NOTIFICATION,
    ADD_PROD_TO_CART_NOTIFICATION_ERROR,
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION,
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR,
    PERFORM_CHECKOUT_NOTIFICATION,
    PERFORM_CHECKOUT_NOTIFICATION_ERROR
} from "../../constants/action_types";

const initialState = {
    addCartProductNotification: false,
    addCartProductNotificationError: false,
    removeProductFromCartNotification: false,
    removeProductFromCartNotificationError: false,
    checkoutNotification: false,
    checkoutNotificationError: false
};

export function cartNotificationsReducer(state = initialState, action) {
    if (action.type == ADD_PROD_TO_CART_NOTIFICATION) {
        return updateStateObject(state, {
            addCartProductNotification: action.payload.addCartProductNotification
        });
    }
    else if (action.type == ADD_PROD_TO_CART_NOTIFICATION_ERROR) {
        return updateStateObject(state, {
            addCartProductNotificationError: action.payload.addCartProductNotificationError
        });
    }
    else if (action.type == REMOVE_PRODUCT_FROM_CART_NOTIFICATION) {
        return updateStateObject(state, {
            removeProductFromCartNotification: action.payload.removeProductFromCartNotification
        });
    }
    else if (action.type == REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR) {
        return updateStateObject(state, {
            removeProductFromCartNotificationError: action.payload.removeProductFromCartNotificationnError
        });
    }
    else if (action.type == PERFORM_CHECKOUT_NOTIFICATION ) {
        return updateStateObject(state, {
            checkoutNotification: action.payload.checkoutNotification
        });
    }
    else if (action.type == PERFORM_CHECKOUT_NOTIFICATION_ERROR ) {
        return updateStateObject(state, {
            checkoutNotificationError: action.payload.checkoutNotificationError
        });
    }

    return state;
}
