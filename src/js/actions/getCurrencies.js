import axios from "axios";
import { GET_CURRENCIES } from "../constants/action_types"


export function getCurrencies() {
    // @TODO: add rest call
    const payload = {
        currencies: [
            {
                id: 1, 
                currency: "$"
            },
            { 
                id: 2,
                currency: "€"
            },
        ]
    }
    
    return { type: GET_CURRENCIES, payload };
}