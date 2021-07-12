import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { REMOVE_PRODUCT } from "../constants/action_types";
import { URL_ADMIN_REMOVE_PRODUCT } from "../constants/rest_api";


const dispatchRemoveProduct = payload => (
    { type: REMOVE_PRODUCT, payload }
);


export function removeProduct(prodId, token) {
    return function (dispatch) {
        let payload = {};
        const url = URL_ADMIN_REMOVE_PRODUCT + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.delete(url)
            .then(result => {
                payload = {
                    removeProductLoading: true
                }
                dispatch(dispatchRemoveProduct(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                payload = {
                    removeProductLoading: true
                }
                dispatch(dispatchRemoveProduct(payload))
            });
    }
}