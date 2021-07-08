import axios from "axios";
import { LOGIN } from "../constants/action_types"


export function login(username, password) {
    // @TODO: add rest call
    let userRole = "CUSTOMER";
    if (username == "admin") {
        userRole = "ADMIN"
    }
    const payload = { token: "123", role: userRole};
    return { type: LOGIN, payload };
}