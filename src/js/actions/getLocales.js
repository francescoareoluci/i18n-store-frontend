import axios from "axios";
import { GET_LOCALES } from "../constants/action_types"


export function getLocales() {
    // @TODO: add rest call
    const payload = {
        locales: [
            {
                id: 1,
                countryCode: "US",
                languageCode: "en", 
            },
            {
                id: 2,
                countryCode: "IT",
                languageCode: "it", 
            },
        ]
    }
    
    return { type: GET_LOCALES, payload };
}