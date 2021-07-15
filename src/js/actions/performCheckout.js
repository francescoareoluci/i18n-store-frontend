import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { PERFORM_CHECKOUT_NOTIFICATION } from "../constants/action_types";
import { PERFORM_CHECKOUT_NOTIFICATION_ERROR } from "../constants/action_types";
import { URL_CUSTOMER_CHECKOUT } from "../constants/rest_api";


const setPerformCheckoutNotification = notify => (
    { 
        type: PERFORM_CHECKOUT_NOTIFICATION, 
        payload: {
            checkoutNotification: notify
        } 
    }
);

const setPerformCheckoutNotificationError = notify => (
    { 
        type: PERFORM_CHECKOUT_NOTIFICATION_ERROR, 
        payload: {
            checkoutNotificationError: notify
        } 
    }
);

export function performCheckout(token) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_CUSTOMER_CHECKOUT;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                dispatch(setPerformCheckoutNotification(true))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(setPerformCheckoutNotificationError(false))
            });
    }
}

export function disablePerformCheckoutNotification() {
    return setPerformCheckoutNotification(false);
}

export function disablePerformCheckoutNotificationError() {
    return setPerformCheckoutNotificationError(false);
}