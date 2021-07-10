import axios from "axios";
import { GET_USERS } from "../constants/action_types"


export function getUsers() {
    // @TODO: add rest call
    const payload = {
        users: [
            {
                id: 1,
                firstName: "firstName1",
                lastName: "lastName1", 
                mail: "user1@example.com",
                role: "Admin"
            },
            {
                id: 2,
                firstName: "firstName2",
                lastName: "lastName2", 
                mail: "user2@example.com",
                role: "Admin"
            },
            {
                id: 3,
                firstName: "firstName3",
                lastName: "lastName3", 
                mail: "user3@example.com",
                role: "Customer"
            },
            {
                id: 4,
                firstName: "firstName4",
                lastName: "lastName4", 
                mail: "user4@example.com",
                role: "Customer"
            },
        ]
    }
    
    return { type: GET_USERS, payload };
}