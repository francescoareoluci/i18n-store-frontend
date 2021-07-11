import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { CHANGE_CUSTOMER_SELECTED_PRODUCT } from "../constants/action_types"
import { URL_CUSTOMER_PRODUCTS } from "../constants/rest_api";


/**
 *  selectedProduct = {
            id: prodId, 
            name: "Prod1",
            manufacturer: "Man1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Vivamus congue pellentesque risus in tempus. Phasellus condimentum \
                quam non placerat convallis. Nunc quis libero porttitor, semper \
                purus sed, mollis libero. Donec ornare lorem lacus, sit amet bibendum \
                libero pharetra id. Fusce luctus lectus in sapien efficitur, nec \
                sodales arcu consectetur. Sed vestibulum fermentum velit vel ullamcorper. \
                Vivamus sit amet sem urna. Ut et urna sed ante feugiat malesuada.",
            price: "123.45 $"
    }
 */

const dispatchProductInfo = payload => (
    { type: CHANGE_CUSTOMER_SELECTED_PRODUCT, payload }
);

export function changeCustomerSelectedProduct(prodId, token) {

    return function (dispatch) {
        let product = {};
        const url = URL_CUSTOMER_PRODUCTS + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                let p = result.data;
                let name = "";
                let description = "";
                for (let i = 0; i < p.localizedTextualItemList.length; i++) {
                    if (p.localizedTextualItemList[i].fieldType == "product_name") {
                        name = p.localizedTextualItemList[i].text;
                    }
                    if (p.localizedTextualItemList[i].fieldType == "product_description") {
                        description = p.localizedTextualItemList[i].text;
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

                product = {
                    id: p.id,
                    name: name,
                    manufacturer: p.manufacturer,
                    description: description,
                    price: price + " " + currency
                }
                dispatch(dispatchProductInfo(product))
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(dispatchUnauth());
                }

                dispatch(dispatchProductInfo(product))
            });
        }
}