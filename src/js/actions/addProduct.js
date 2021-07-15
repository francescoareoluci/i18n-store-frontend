import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { ADD_PRODUCT } from "../constants/action_types";
import { URL_ADMIN_ADD_PRODUCT } from "../constants/rest_api";


const dispatchAddProduct = payload => (
    { type: ADD_PRODUCT, payload }
);

export function addProduct(token, product) {
    
    return function (dispatch) {
        let payload = {};
        const url = URL_ADMIN_ADD_PRODUCT;
        const axiosInstance = buildCustomAxios(token);          

        return axiosInstance.post(url, product)
            .then(result => {
                payload = {
                    addedProductLoading: true,
                }
                dispatch(dispatchAddProduct(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                payload = {
                    addedProductLoading: true,
                }
                dispatch(dispatchAddProduct(payload))
            });
    }
}