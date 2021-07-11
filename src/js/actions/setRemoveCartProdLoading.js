import { SET_REMOVED_CART_PROD_LOADING } from "../constants/action_types"


export function setRemoveCartProdLoading(isDone) {
    const payload = { removeCartProductLoading: isDone };

    return { type: SET_REMOVED_CART_PROD_LOADING, payload };
}