import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { 
    REMOVE_PRODUCT_NOTIFICATION, 
    REMOVE_PRODUCT_NOTIFICATION_ERROR 
} from "../constants/action_types";
import { URL_ADMIN_REMOVE_PRODUCT } from "../constants/rest_api";


const dispatchRemoveProductNotification = notify => (
    { 
        type: REMOVE_PRODUCT_NOTIFICATION, 
        payload: {
            removeProductNotification: notify
        } 
    }
);

const dispatchRemoveProductNotificationError = notify => (
    { 
        type: REMOVE_PRODUCT_NOTIFICATION_ERROR, 
        payload: {
            removeProductNotificationError: notify 
        }
    }
);

export function removeProduct(prodId, token) {
    return function (dispatch) {
        let payload = {};
        const url = URL_ADMIN_REMOVE_PRODUCT + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.delete(url)
            .then(result => {
                dispatch(dispatchRemoveProductNotification(true))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchRemoveProductNotificationError(true))
            });
    }
}

export function disableRemoveProductNotification() {
    return dispatchRemoveProductNotification(false);
}

export function disableRemoveProductNotificationError() {
    return dispatchRemoveProductNotificationError(false);
}