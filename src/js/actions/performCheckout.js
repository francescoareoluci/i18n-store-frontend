import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { PERFORM_CHECKOUT } from "../constants/action_types";
import { URL_CUSTOMER_CHECKOUT } from "../constants/rest_api";


const dispatchPerformCheckout = payload => (
    { type: PERFORM_CHECKOUT, payload }
);

export function performCheckout(token) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_CUSTOMER_CHECKOUT;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                payload = {
                    checkoutLoadingDone: true
                }
                dispatch(dispatchPerformCheckout(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                payload = {
                    checkoutLoadingDone: true
                }
                dispatch(dispatchPerformCheckout(payload))
            });
    }
}