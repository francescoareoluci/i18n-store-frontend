import buildCustomAxios from "../constants/token_axios";
import dispatchUnauth from "./handleUnauth";
import { CHANGE_ADMIN_SELECTED_PRODUCT } from "../constants/action_types"
import { URL_ADMIN_PRODUCTS } from "../constants/rest_api";


/**
 *  selectedProduct = {
            id: prodId, 
            manufacturer: "Man1",
            translations: [
                {
                    locale: "en",
                    name: "Product1",
                    price: "123.45 $",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                        Vivamus congue pellentesque risus in tempus. Phasellus condimentum \
                },
                {
                    locale: "it",
                    name: "Prodotto1",
                    price: "149.99 £",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                        Vivamus congue pellentesque risus in tempus. Phasellus condimentum \,
                }
            ]
    };
 */

const dispatchProductInfo = payload => (
    { type: CHANGE_ADMIN_SELECTED_PRODUCT, payload }
);

export function changeAdminSelectedProduct(prodId, token) {

    return function (dispatch) {
        let product = {};
        const url = URL_ADMIN_PRODUCTS + "/" + prodId;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                let p = result.data;
                let translations = [];
                let locales = [];
                let names = [];
                let descriptions = [];
                let prices = [];
                let found = false;

                let name = {};
                let description = {};
                for (let i = 0; i < p.localizedTextualItemList.length; i++) {
                    found = false;
                    if (p.localizedTextualItemList[i].fieldType == "product_name") {
                        name = {
                            name: p.localizedTextualItemList[i].text,
                            locale: p.localizedTextualItemList[i].languageCode
                        }
                        names.push(name);
                        found = true;
                    }
                    if (p.localizedTextualItemList[i].fieldType == "product_description") {
                        description = {
                            descr: p.localizedTextualItemList[i].text,
                            locale: p.localizedTextualItemList[i].languageCode
                        }
                        descriptions.push(description);
                        found = true;
                    }    
                    if (found && !locales.includes(p.localizedTextualItemList[i].languageCode))
                        locales.push(p.localizedTextualItemList[i].languageCode);
                }

                let price = {};
                for (let i = 0; i < p.localizedCurrencyItemList.length; i++) {
                    found = false;
                    if (p.localizedCurrencyItemList[i].fieldType == "product_price") {
                        price = {
                            price: p.localizedCurrencyItemList[i].price,
                            currency: p.localizedCurrencyItemList[i].currency,
                            locale: p.localizedCurrencyItemList[i].languageCode
                        }
                        found = true
                        prices.push(price);  
                    }
                    if (found && !locales.includes(p.localizedTextualItemList[i].languageCode)) 
                        locales.push(p.localizedCurrencyItemList[i].languageCode);  
                }

                let translation = {};
                let trName = "";
                let trDescr = "";
                let trPrice = "";
                let locale = "";
                for (let i = 0; i < locales.length; i++) {
                    locale = locales[i];
                    for (let j = 0; j < names.length; j++) {
                        if (names[j].locale == locale) {
                            trName = names[j].name;
                        }
                    }
                    for (let j = 0; j < descriptions.length; j++) {
                        if (descriptions[j].locale == locale) {
                            trDescr = descriptions[j].descr;
                        }
                    }
                    for (let j = 0; j < prices.length; j++) {
                        if (prices[j].locale == locale) {
                            trPrice = prices[j].price + " " + prices[j].currency;
                        }
                    }
                    translation = {
                        locale: locale,
                        name: trName,
                        price: trPrice,
                        description: trDescr
                    };
                    translations.push(translation);
                }

                product = {
                    id: p.id,
                    manufacturer: p.manufacturer,
                    translations: translations
                }
                console.log(product);
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