import buildCustomAxios from "../constants/token_axios";
import { GET_MANUFACTURERS } from "../constants/action_types";
import { URL_ADMIN_MANUFACTURERS } from "../constants/rest_api";


/**
 * manufacturerList = { 
 *      manufacturers: [
 *          {
 *              id: 1,
 *              manufacturer: "Manufacturer1"
 *          },
 *          {
 *              id: 2,
 *              manufacturer: "Manufacturers2"
 *          },
 *          {
 *              id: 3,
 *              manufacturer: "Manufacturer3"
 *          }
 *      ]
 * }
 */

const dispatchManufacturers = payload => (
    { type: GET_MANUFACTURERS, payload }
);


export function getManufacturers(token) {

    return function (dispatch) {
        let payload = {};
        let manufacturers = [];
        const url = URL_ADMIN_MANUFACTURERS;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                result.data.map((m) => {
                    let manufacturer = {
                        id: m.id,
                        manufacturer: m.name
                    }
                    manufacturers.push(manufacturer);
                });
                payload = {
                    manufacturers: manufacturers
                }
                dispatch(dispatchManufacturers(payload))
            })
            .catch(error => {
                console.log(error);
                dispatch(dispatchManufacturers(payload))
            });
    }
}