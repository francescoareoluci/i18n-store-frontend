import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { GET_SIMILAR_PRODUCTS } from "../constants/action_types"
import { URL_SEARCH_SIMILAR } from "../constants/rest_api";


const dispatchSearchSimilar = payload => (
    { type: GET_SIMILAR_PRODUCTS, payload }
);

export function getSimilarProducts(prodId, token) {
    
    return function (dispatch) {
        let products = [];
        let url = URL_SEARCH_SIMILAR;
        url += "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                result.data.map((p) => {
                    let productName = "";
                    for (let i = 0; i < p.localizedTextualItemList.length; i++) {
                        if (p.localizedTextualItemList[i].fieldType == "product_name") {
                            productName = p.localizedTextualItemList[i].text;
                            break;
                        }    
                    }

                    let price = "";
                    let currency = "";
                    for (let i = 0; i < p.localizedCurrencyItemList.length; i++) {
                        if (p.localizedCurrencyItemList[i].fieldType == "product_price") {
                            price = p.localizedCurrencyItemList[i].price;
                            currency = p.localizedCurrencyItemList[i].currency;
                            break;
                        }    
                    }

                    let product = {
                        id: p.id,
                        manufacturer: p.manufacturer,
                        name: productName,
                        price: price + " " + currency
                    };
                    
                    products.push(product);
                });
                dispatch(dispatchSearchSimilar(products))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchSearchSimilar(products))
            });
    }
}