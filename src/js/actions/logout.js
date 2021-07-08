import axios from "axios";
import { LOGOUT } from "../constants/action_types"


export function logout(username, password) {
    // @TODO: add rest call
    const payload = { token: "", role: ""};

    // Remove token saved in storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    return { type: LOGOUT, payload };
}