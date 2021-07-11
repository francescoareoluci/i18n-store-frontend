import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { REMOVE_PROD_FROM_CART } from "../constants/action_types";
import { URL_CUSTOMER_REMOVE_PROD_FROM_CART } from "../constants/rest_api";


const dispatchRemoveProductFromCart = payload => (
    { type: REMOVE_PROD_FROM_CART, payload }
);


export function removeProductFromCart(prodId, token) {
    return function (dispatch) {
        let payload = {};
        const url = URL_CUSTOMER_REMOVE_PROD_FROM_CART + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                payload = {
                    removeCartProductLoading: true
                }
                dispatch(dispatchRemoveProductFromCart(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                payload = {
                    removeCartProductLoading: true
                }
                dispatch(dispatchRemoveProductFromCart(payload))
            });
    }
}