import { combineReducers } from 'redux'

import { productNotificationsReducer } from "./products_reducer";
import { cartNotificationsReducer } from "./cart_reducer";


export const notificationsReducer = combineReducers({
    products: productNotificationsReducer,
    cart: cartNotificationsReducer
});