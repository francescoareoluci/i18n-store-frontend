import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { GET_SHOPPING_LIST } from "../constants/action_types";
import { 
    CUSTOMER_BASE_URL,
    URL_CUSTOMER_SHOPPING_LIST 
} from "../constants/rest_api";


/**
 * shoppingList = {
        products: [
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
    }
 */

const dispatchShoppingList = payload => (
    { type: GET_SHOPPING_LIST, payload }
);

export function getShoppingList(userId, token) {

    return function (dispatch) {
        let payload = {};
        let purchasedProducts = [];
        const url = CUSTOMER_BASE_URL + "/" + userId + URL_CUSTOMER_SHOPPING_LIST;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                let sl = result.data;

                sl.purchasedProducts.map((p) => {
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

                    purchasedProducts.push(product);
                });

                payload = {
                    products: purchasedProducts
                }
                dispatch(dispatchShoppingList(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchShoppingList(payload))
            });
    }
}