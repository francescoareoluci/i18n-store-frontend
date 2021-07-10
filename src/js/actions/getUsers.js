import buildCustomAxios from "../constants/token_axios";
import { GET_USERS } from "../constants/action_types";
import { URL_ADMIN_USERS } from "../constants/rest_api";


/**
 * userList = { 
 *      users: [
 *           {
 *               id: 1,
 *               firstName: "firstName1",
 *               lastName: "lastName1", 
 *               mail: "user1@example.com",
 *               role: "Admin"
 *           },
 *           {
 *               id: 2,
 *               firstName: "firstName2",
 *               lastName: "lastName2", 
 *               mail: "user2@example.com",
 *               role: "Customer"
 *           }
 *      ]
 * }
 */

const dispatchUsers = payload => (
    { type: GET_USERS, payload }
);

export function getUsers(token) {

    return function (dispatch) {
        let payload = {};
        let users = [];
        const url = URL_ADMIN_USERS;
        const axiosInstance = buildCustomAxios(token);          
        
        return axiosInstance.get(url)
            .then(result => {
                result.map((u) => {
                    let user = {
                        id: u.id,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        mail: u.mail,
                        role: u.role
                    }
                    users.push(user);
                });
                payload = {
                    users: users
                }
                dispatch(dispatchUsers(payload))
            })
            .catch(error => {
                console.log(error);
                dispatch(dispatchUsers(payload))
            });
    }
}