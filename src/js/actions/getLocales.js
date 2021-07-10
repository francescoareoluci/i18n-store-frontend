import buildCustomAxios from "../constants/token_axios";
import { GET_LOCALES } from "../constants/action_types"
import { URL_ADMIN_LOCALES } from "../constants/rest_api";


/**
 * localeList = {
 *     locales: [
 *         {
 *             id: 1,
 *             countryCode: "US",
 *             languageCode: "en", 
 *         },
 *         {
 *             id: 2,
 *             countryCode: "IT",
 *             languageCode: "it", 
 *         },
 *     ]
 * }
 */

const dispatchLocales = payload => (
    { type: GET_LOCALES, payload }
);

export function getLocales(token) {

    return function (dispatch) {
        let payload = {};
        let locales = [];
        const url = URL_ADMIN_LOCALES;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                result.map((l) => {
                    let locale = {
                        id: l.id,
                        languageCode: l.languageCode,
                        countryCode: l.countryCode
                    }
                    locales.push(locale);
                });
                payload = {
                    locales: locales
                }
                dispatch(dispatchLocales(payload))
            })
            .catch(error => {
                console.log(error);
                dispatch(dispatchLocales(payload))
            });
    }
}