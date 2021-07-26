import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    PERFORM_CHECKOUT_NOTIFICATION, 
    PERFORM_CHECKOUT_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { 
    CUSTOMER_BASE_URL,
    URL_CUSTOMER_CHECKOUT 
} from "../constants/rest_api";


const dispatchPerformCheckoutNotification = notify => (
    { 
        type: PERFORM_CHECKOUT_NOTIFICATION, 
        payload: {
            checkoutNotification: notify
        } 
    }
);

const dispatchPerformCheckoutNotificationError = notify => (
    { 
        type: PERFORM_CHECKOUT_NOTIFICATION_ERROR, 
        payload: {
            checkoutNotificationError: notify
        } 
    }
);

export function performCheckout(userId, token) {
    
    return function (dispatch) {
        let payload = {};
        const url = CUSTOMER_BASE_URL + "/" + userId + URL_CUSTOMER_CHECKOUT;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                dispatch(dispatchPerformCheckoutNotification(true))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchPerformCheckoutNotificationError(false))
            });
    }
}

export function disablePerformCheckoutNotification() {
    return dispatchPerformCheckoutNotification(false);
}

export function disablePerformCheckoutNotificationError() {
    return dispatchPerformCheckoutNotificationError(false);
}