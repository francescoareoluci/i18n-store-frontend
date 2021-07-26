import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION,
    REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { 
    CUSTOMER_BASE_URL,
    URL_CUSTOMER_REMOVE_PROD_FROM_CART 
} from "../constants/rest_api";


const dispatchRemoveProdFromCartNotification = notify => (
    { 
        type: REMOVE_PRODUCT_FROM_CART_NOTIFICATION, 
        payload: {
            removeProductFromCartNotification: notify
        } 
    }
);

const dispatchRemoveProdFromCartNotificationError = notify => (
    { 
        type: REMOVE_PRODUCT_FROM_CART_NOTIFICATION_ERROR, 
        payload: {
            removeProductFromCartNotificationError: notify 
        }
    }
);

export function removeProductFromCart(prodId, userId, token) {
    return function (dispatch) {
        let payload = {};
        const url = CUSTOMER_BASE_URL + "/" + userId +
                    URL_CUSTOMER_REMOVE_PROD_FROM_CART + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.delete(url)
            .then(result => {
                dispatch(dispatchRemoveProdFromCartNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchRemoveProdFromCartNotificationError(true));
            });
    }
}

export function disableRemoveProdFromCartNotification() {
    return dispatchRemoveProdFromCartNotification(false);
}

export function disableRemoveProdFromCartNotificationError() {
    return dispatchRemoveProdFromCartNotificationError(false);
}