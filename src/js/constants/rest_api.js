const adminEndpoint = '/admin';
const customerEndpoint = '/customer';

export const BASE_URL = 'http://localhost:8080/i18n-store-1.0-SNAPSHOT/api';

export const URL_LOGIN = '/auth/login';
export const URL_SEARCH = '/search/products';

export const URL_ADMIN_USERS = adminEndpoint + '/users';
export const URL_ADMIN_CURRENCIES = adminEndpoint + '/currencies';
export const URL_ADMIN_MANUFACTURERS = adminEndpoint + '/manufacturers';
export const URL_ADMIN_LOCALES = adminEndpoint + '/locales';
export const URL_ADMIN_PRODUCTS = adminEndpoint + '/products';

export const URL_CUSTOMER_PRODUCTS = customerEndpoint + '/products';
export const URL_CUSTOMER_CART = customerEndpoint + '/shopping-cart';
export const URL_CUSTOMER_SHOPPING_LIST = customerEndpoint + '/shopping-list';
export const URL_CUSTOMER_ADD_PROD_TO_CART = customerEndpoint + '/shopping-cart/add';
export const URL_CUSTOMER_REMOVE_PROD_FROM_CART = customerEndpoint + '/shopping-cart/remove';
export const URL_CUSTOMER_CHECKOUT = customerEndpoint + '/shopping-cart/checkout';

