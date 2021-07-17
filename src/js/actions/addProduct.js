import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    ADD_PRODUCT_NOTIFICATION, 
    ADD_PRODUCT_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { URL_ADMIN_ADD_PRODUCT } from "../constants/rest_api";


const dispatchAddProductNotification = notify => (
    { 
        type: ADD_PRODUCT_NOTIFICATION, 
        payload: {
            addProductNotification: notify
        } 
    }
);

const dispatchAddProductNotificationError = notify => (
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
                dispatch(dispatchAddProductNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchAddProductNotificationError(true));
            });
    }
}

export function disableAddProductNotification() {
    return dispatchAddProductNotification(false);
}

export function disableAddProductNotificationError() {
    return dispatchAddProductNotificationError(false);
}