import axios from "axios";
import { LOGOUT } from "../constants/action_types"


export function logout(username, password) {
    // @TODO: add rest call
    const payload = { token: "", role: ""};
    return { type: LOGOUT, payload };
}