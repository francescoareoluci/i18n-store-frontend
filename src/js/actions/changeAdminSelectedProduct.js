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
                let categories = [];
                let prices = [];
                let found = false;

                let name = {};
                let description = {};
                let category = {};
                for (let i = 0; i < p.localizedTextualItemList.length; i++) {
                    found = false;
                    let locale = p.localizedTextualItemList[i].languageCode + "-" + 
                                    p.localizedTextualItemList[i].countryCode
                    if (p.localizedTextualItemList[i].fieldType == "product_name") {
                        name = {
                            name: p.localizedTextualItemList[i].text,
                            nameId: p.localizedTextualItemList[i].id,
                            locale: locale
                        }
                        names.push(name);
                        found = true;
                    }
                    if (p.localizedTextualItemList[i].fieldType == "product_description") {
                        description = {
                            descr: p.localizedTextualItemList[i].text,
                            descrId: p.localizedTextualItemList[i].id,
                            locale: locale
                        }
                        descriptions.push(description);
                        found = true;
                    }
                    if (p.localizedTextualItemList[i].fieldType == "product_category") {
                        category = {
                            category: p.localizedTextualItemList[i].text,
                            categoryId: p.localizedTextualItemList[i].id,
                            locale: locale
                        }
                        categories.push(category);
                        found = true;
                    }
                    if (found && !locales.includes(locale))
                        locales.push(locale);
                }

                let price = {};
                for (let i = 0; i < p.localizedCurrencyItemList.length; i++) {
                    found = false;
                    let locale = p.localizedCurrencyItemList[i].languageCode + "-" + 
                                    p.localizedCurrencyItemList[i].countryCode
                    if (p.localizedCurrencyItemList[i].fieldType == "product_price") {
                        price = {
                            price: p.localizedCurrencyItemList[i].price,
                            currency: p.localizedCurrencyItemList[i].currency,
                            priceId: p.localizedCurrencyItemList[i].id,
                            locale: locale
                        }
                        found = true
                        prices.push(price);  
                    }
                    if (found && !locales.includes(locale)) 
                        locales.push(locale);  
                }

                let translation = {};
                let trName = "";
                let trNameId = "";
                let trDescr = "";
                let trDescrId = "";
                let trPrice = "";
                let trCategory = "";
                let trPriceId = "";
                let trCategoryId = "";
                let locale = "";
                for (let i = 0; i < locales.length; i++) {
                    locale = locales[i];
                    for (let j = 0; j < names.length; j++) {
                        if (names[j].locale == locale) {
                            trName = names[j].name;
                            trNameId = names[j].nameId;
                        }
                    }
                    for (let j = 0; j < descriptions.length; j++) {
                        if (descriptions[j].locale == locale) {
                            trDescr = descriptions[j].descr;
                            trDescrId = descriptions[j].descrId;
                        }
                    }
                    for (let j = 0; j < categories.length; j++) {
                        if (categories[j].locale == locale) {
                            trCategory = categories[j].category;
                            trCategoryId = categories[j].categoryId;
                        }
                    }
                    for (let j = 0; j < prices.length; j++) {
                        if (prices[j].locale == locale) {
                            trPrice = prices[j].price + " " + prices[j].currency;
                            trPriceId = prices[j].priceId;
                        }
                    }
                    translation = {
                        locale: locale,
                        name: trName,
                        nameId: trNameId,
                        price: trPrice,
                        priceId: trPriceId,
                        description: trDescr,
                        descriptionId: trDescrId,
                        category: trCategory,
                        categoryId: trCategoryId
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