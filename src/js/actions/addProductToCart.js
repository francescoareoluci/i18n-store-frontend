import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { ADD_PROD_TO_CART_NOTIFICATION } from "../constants/action_types";
import { ADD_PROD_TO_CART_NOTIFICATION_ERROR } from "../constants/action_types";
import { URL_CUSTOMER_ADD_PROD_TO_CART } from "../constants/rest_api";


const setAddProductToCartNotification = notify => (
    { 
        type: ADD_PROD_TO_CART_NOTIFICATION, 
        payload: {
            addCartProductNotification: notify 
        }
    }
);

const setAddProductToCartNotificationError = notify => (
    { 
        type: ADD_PROD_TO_CART_NOTIFICATION_ERROR, 
        payload: {
            addCartProductNotificationError: notify 
        }
    }
);

export function addProductToCart(prodId, token) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_CUSTOMER_ADD_PROD_TO_CART + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                dispatch(setAddProductToCartNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(setAddProductToCartNotificationError(true));
            });
    }
}

export function disableAddProductToCartNotification() {
    return setAddProductToCartNotification(false);
}

export function disableAddProductToCartNotificationError() {
    return setAddProductToCartNotificationError(false);
}