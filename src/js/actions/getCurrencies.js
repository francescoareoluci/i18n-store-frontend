import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { GET_CURRENCIES } from "../constants/action_types";
import { URL_ADMIN_CURRENCIES } from "../constants/rest_api";


/**
 * currencyList = {
 *     currencies: [
 *         {
 *             id: 1, 
 *             currency: "$"
 *         },
 *         { 
 *             id: 2,
 *             currency: "€"
 *         },
 *     ]
 * }
 */

const dispatchCurrencies = payload => (
    { type: GET_CURRENCIES, payload }
);

export function getCurrencies(token) {
    
    return function (dispatch) {
        let payload = {};
        let currencies = [];
        const url = URL_ADMIN_CURRENCIES;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                result.data.map((c) => {
                    let currency = {
                        id: c.id,
                        currency: c.currency,
                    }
                    currencies.push(currency);
                });
                payload = {
                    currencies: currencies
                }
                dispatch(dispatchCurrencies(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }
                
                dispatch(dispatchCurrencies(payload))
            });
    }
}