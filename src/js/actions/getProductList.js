import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { GET_PRODUCT_LIST } from "../constants/action_types";
import { URL_ADMIN_PRODUCTS } from "../constants/rest_api";
import { URL_CUSTOMER_PRODUCTS } from "../constants/rest_api";


/**
 * productList = [
        {
            id: 1, 
            name: "Product1",
            manufacturer: "Manufacturer1",
            price: "123.45 $"
        },
        { 
            id: 2,
            name: "Product2",
            manufacturer: "Manufacturer2",
            price: "13.67 $"
        },
    ]  
 */

const dispatchProducts = payload => (
    { type: GET_PRODUCT_LIST, payload }
);

export function getProductList(isAdmin, token) {

    return function (dispatch) {
        let products = [];
        const url = isAdmin ? URL_ADMIN_PRODUCTS : URL_CUSTOMER_PRODUCTS;
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
                dispatch(dispatchProducts(products))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchProducts(products))
            });
    }
}