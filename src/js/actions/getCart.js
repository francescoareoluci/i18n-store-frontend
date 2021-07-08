import axios from "axios";
import { GET_CART } from "../constants/action_types"


export function getCart() {
    // @TODO: add rest call
    const payload = {
        totalCost: "156.98 $",
        products: [
            {
                id: 1, 
                name: "Product1",
                manufacturer: "Manufacturer1",
                price: "123.45 $"
            },
            { 
                id: 2,
                name: "Product2",
                manufacturer: "Manufacturer2",
                price: "13.67 $"
            },
        ]
    }
    
    return { type: GET_CART, payload };
}