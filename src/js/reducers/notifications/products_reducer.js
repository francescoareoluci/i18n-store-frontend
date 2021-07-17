import { updateStateObject } from "../state_utils";
import { 
    ADD_PRODUCT_NOTIFICATION,
    ADD_PRODUCT_NOTIFICATION_ERROR,
    REMOVE_PRODUCT_NOTIFICATION,
    REMOVE_PRODUCT_NOTIFICATION_ERROR
} from "../../constants/action_types";


const initialState = {
    addProductNotification: false,
    addProductNotificationError: false,
    removeProductNotification: false,
    removeProductNotificationError: false
};

export function productNotificationsReducer(state = initialState, action) {
    if (action.type == ADD_PRODUCT_NOTIFICATION) {
        return updateStateObject(state, {
            addProductNotification: action.payload.addProductNotification
        });
    }
    else if (action.type == ADD_PRODUCT_NOTIFICATION_ERROR) {
        return updateStateObject(state, {
            addProductNotificationError: action.payload.addProductNotificationError
        });
    }
    else if (action.type == REMOVE_PRODUCT_NOTIFICATION) {
        return updateStateObject(state, {
            removeProductNotification: action.payload.removeProductNotification
        });
    }
    else if (action.type == REMOVE_PRODUCT_NOTIFICATION_ERROR) {
        return updateStateObject(state, {
            removeProductNotificationError: action.payload.removeProductNotificationError
        });
    }

    return state;
}