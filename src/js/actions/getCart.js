import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { GET_CART } from "../constants/action_types";
import { 
    CUSTOMER_BASE_URL,
    URL_CUSTOMER_CART 
} from "../constants/rest_api";

/**
 * shoppingCart = {
        totalCost: "156.98 $",
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

const dispatchShoppingCart = payload => (
    { type: GET_CART, payload }
);

export function getCart(userId, token) {

    return function (dispatch) {
        let payload = {};
        let cartProducts = [];
        let totalCost = "";
        const url = CUSTOMER_BASE_URL + "/" + userId  + URL_CUSTOMER_CART;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                let sc = result.data;
                totalCost = sc.totalCost + " " + sc.costCurrency;

                sc.cartProducts.map((p) => {
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

                    cartProducts.push(product);
                });

                payload = {
                    totalCost: totalCost,
                    products: cartProducts
                }
                dispatch(dispatchShoppingCart(payload))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchShoppingCart(payload))
            });
    }
}