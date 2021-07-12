import buildLoginAxios from "../constants/login_axios";
import { LOGIN } from "../constants/action_types";
import { URL_LOGIN } from "../constants/rest_api";
import jwt_decode from "jwt-decode";


const dispatchAuthentication = payload => (
    { type: LOGIN, payload }
);

export function login(username, password) {
    /*
    let userRole = "CUSTOMER";
    if (username == "admin") {
        userRole = "ADMIN"
    }
    const token = "123";
    const payload = { token: "123", role: userRole};

    return { type: LOGIN, payload };
    */

    return function (dispatch) {
        let payload = {};
        let token = "";
        let role = "";
        let language = "";
        let decToken = "";
        const url = URL_LOGIN;
        const axiosInstance = buildLoginAxios(username, password);

        return axiosInstance.get(url)
            .then((result) => {
                token = result.data;
                decToken = jwt_decode(result.data);
                role = decToken.userRole;
                language = decToken.lang;

                payload = {
                    token: token,
                    role: role,
                    language: language
                }
                dispatch(dispatchAuthentication(payload))
            })
            .catch(error => {
                console.log(error);
                payload = {
                    token: "",
                    role: "UNAUTHORIZED",
                    langauge: "en"
                }
                dispatch(dispatchAuthentication(payload))
            });
    }
}