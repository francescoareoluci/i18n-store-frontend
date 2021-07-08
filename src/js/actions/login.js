import axios from "axios";
import { LOGIN } from "../constants/action_types"


export function login(username, password) {
    // @TODO: add rest call
    let userRole = "CUSTOMER";
    if (username == "admin") {
        userRole = "ADMIN"
    }
    const token = "123";
    const payload = { token: "123", role: userRole};

    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);

    return { type: LOGIN, payload };
}