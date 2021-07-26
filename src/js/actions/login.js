import buildLoginAxios from "../constants/login_axios";
import { LOGIN } from "../constants/action_types";
import { URL_LOGIN } from "../constants/rest_api";
import jwt_decode from "jwt-decode";


const dispatchAuthentication = payload => (
    { type: LOGIN, payload }
);

export function login(username, password) {

    return function (dispatch) {
        let payload = {};
        let token = "";
        let role = "";
        let language = "";
        let userId = -1;
        let decToken = "";
        const url = URL_LOGIN;
        const axiosInstance = buildLoginAxios(username, password);

        return axiosInstance.get(url)
            .then((result) => {
                token = result.data;
                decToken = jwt_decode(result.data);
                role = decToken.userRole;
                language = decToken.lang;
                userId = decToken.userId;

                payload = {
                    token: token,
                    role: role,
                    language: language,
                    userId: userId
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