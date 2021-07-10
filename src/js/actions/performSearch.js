import axios from "axios";
import { PERFORM_SEARCH } from "../constants/action_types"


export function performSearch(keywords) {
    // @TODO: add rest call
    const payload = [
        { 
            id: 3,
            name: "Product3",
            manufacturer: "Manufacturer3",
            price: "987.34 $"
        },
        { 
            id: 4,
            name: "Product4",
            manufacturer: "Manufacturer4",
            price: "231.23 $"
        }
    ]
    
    return { type: PERFORM_SEARCH, payload };
}