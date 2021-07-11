import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { ADD_PROD_TO_CART } from "../constants/action_types";
import { URL_CUSTOMER_ADD_PROD_TO_CART } from "../constants/rest_api";


const dispatchAddProdToCart = payload => (
    { type: ADD_PROD_TO_CART, payload }
);

export function addProductToCart(prodId, token) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_CUSTOMER_ADD_PROD_TO_CART + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.post(url)
            .then(result => {
                payload = {
                    addedCartProduct: prodId
                }
                dispatch(dispatchAddProdToCart(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                payload = {
                    addedCartProduct: -1
                }
                dispatch(dispatchAddProdToCart(payload))
            });
    }
}