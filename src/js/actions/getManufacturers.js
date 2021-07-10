import axios from "axios";
import { GET_MANUFACTURERS } from "../constants/action_types"


export function getManufacturers() {
    // @TODO: add rest call
    const payload = {
        manufacturers: [
            {
                id: 1,
                manufacturer: "Manufacturer1"
            },
            {
                id: 2,
                manufacturer: "Manufacturers2"
            },
            {
                id: 3,
                manufacturer: "Manufacturer3"
            },
            {
                id: 4,
                manufacturer: "Manufacturers4"
            },
            {
                id: 5,
                manufacturer: "Manufacturer5"
            },
            {
                id: 6,
                manufacturer: "Manufacturers6"
            },
        ]
    }
    
    return { type: GET_MANUFACTURERS, payload };
}