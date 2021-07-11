import { SET_CHECKOUT_LOADING } from "../constants/action_types"


export function setCheckoutLoading(isDone) {
    const payload = { checkoutLoadingDone: isDone };

    return { type: SET_CHECKOUT_LOADING, payload };
}