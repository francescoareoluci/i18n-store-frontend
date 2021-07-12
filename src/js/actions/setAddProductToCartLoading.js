import { SET_ADD_PROD_TO_CART_LOADING } from "../constants/action_types"


export function setAddProductToCartLoading(isDone) {
    const payload = { addedCartProductLoading: isDone };

    return { type: SET_ADD_PROD_TO_CART_LOADING, payload };
}