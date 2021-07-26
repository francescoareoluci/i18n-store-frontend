import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    EDIT_PRODUCT_NOTIFICATION, 
    EDIT_PRODUCT_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { URL_ADMIN_EDIT_PRODUCT } from "../constants/rest_api";


const dispatchEditProductNotification = notify => (
    { 
        type: EDIT_PRODUCT_NOTIFICATION, 
        payload: {
            editProductNotification: notify
        } 
    }
);

const dispatchEditProductNotificationError = notify => (
    { 
        type: EDIT_PRODUCT_NOTIFICATION_ERROR, 
        payload: {
            editProductNotificationError: notify 
        }
    }
);

export function editProduct(token, product) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_ADMIN_EDIT_PRODUCT;
        const axiosInstance = buildCustomAxios(token);          

        return axiosInstance.put(url, product)
            .then(result => {
                dispatch(dispatchEditProductNotification(true));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchEditProductNotificationError(true));
            });
    }
}

export function disableEditProductNotification() {
    return dispatchEditProductNotification(false);
}

export function disableEditProductNotificationError() {
    return dispatchEditProductNotificationError(false);
}