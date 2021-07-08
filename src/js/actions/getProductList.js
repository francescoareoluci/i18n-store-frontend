import axios from "axios";
import { GET_PRODUCT_LIST } from "../constants/action_types"


export function getProductList() {
    // @TODO: add rest call
    const payload = [
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
    
    return { type: GET_PRODUCT_LIST, payload };
}