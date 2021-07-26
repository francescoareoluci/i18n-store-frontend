import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    ADD_PROD_TO_CART_NOTIFICATION, 
    ADD_PROD_TO_CART_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { 
    CUSTOMER_BASE_URL, 
    URL_CUSTOMER_ADD_PROD_TO_CART 
} from "../constants/rest_api";


const dipatchAddProductToCartNotification = notify => (
    { 
        type: ADD_PROD_TO_CART_NOTIFICATION, 
        payload: {
            addCartProductNotification: notify 
        }
    }
);

const dipatchAddProductToCartNotificationError = notify => (
    { 
        type: ADD_PROD_TO_CART_NOTIFICATION_ERROR, 
        payload: {
            addCartProductNotificationError: notify 
        }
    }
);

export function addProductToCart(prodId, userId, token) {
    
    return function (dispatch) {
        let payload = {};
        const url = CUSTOMER_BASE_URL + "/" + userId  + 
                    URL_CUSTOMER_ADD_PROD_TO_CART + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                dispatch(dipatchAddProductToCartNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dipatchAddProductToCartNotificationError(true));
            });
    }
}

export function disableAddProductToCartNotification() {
    return dipatchAddProductToCartNotification(false);
}

export function disableAddProductToCartNotificationError() {
    return dipatchAddProductToCartNotificationError(false);
}