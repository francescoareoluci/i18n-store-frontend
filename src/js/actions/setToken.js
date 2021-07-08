import { SET_TOKEN } from "../constants/action_types"


export function setToken(token, role) {
    const payload = { token: token, role: role };

    return { type: SET_TOKEN, payload };
}