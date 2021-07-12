import { SET_REMOVED_PROD_LOADING } from "../constants/action_types"


export function setRemoveProdLoading(isDone) {
    const payload = { removeProductLoading: isDone };

    return { type: SET_REMOVED_PROD_LOADING, payload };
}