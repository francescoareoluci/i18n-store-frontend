import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { ADD_PRODUCT_NOTIFICATION } from "../constants/action_types";
import { ADD_PRODUCT_NOTIFICATION_ERROR } from "../constants/action_types";
import { URL_ADMIN_ADD_PRODUCT } from "../constants/rest_api";


const setAddProductNotification = notify => (
    { 
        type: ADD_PRODUCT_NOTIFICATION, 
        payload: {
            addProductNotification: notify
        } 
    }
);

const setAddProductNotificationError = notify => (
    { 
        type: ADD_PRODUCT_NOTIFICATION_ERROR, 
        payload: {
            addProductNotificationError: notify 
        }
    }
);

export function addProduct(token, product) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_ADMIN_ADD_PRODUCT;
        const axiosInstance = buildCustomAxios(token);          

        return axiosInstance.post(url, product)
            .then(result => {
                dispatch(setAddProductNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(setAddProductNotificationError(true));
            });
    }
}

export function disableAddProductNotification() {
    return setAddProductNotification(false);
}

export function disableAddProductNotificationError() {
    return setAddProductNotificationError(false);
}