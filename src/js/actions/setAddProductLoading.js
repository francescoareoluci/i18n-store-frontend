import { SET_ADD_PRODUCT_LOADING } from "../constants/action_types"


export function setAddProductLoading(isDone) {
    const payload = { addedProductLoading: isDone };

    return { type: SET_ADD_PRODUCT_LOADING, payload };
}