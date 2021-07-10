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
                id: 1,
                manufacturer: "Manufacturer3"
            },
            {
                id: 2,
                manufacturer: "Manufacturers4"
            },
            {
                id: 1,
                manufacturer: "Manufacturer5"
            },
            {
                id: 2,
                manufacturer: "Manufacturers6"
            },
        ]
    }
    
    return { type: GET_MANUFACTURERS, payload };
}