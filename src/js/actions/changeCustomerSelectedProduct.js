import axios from "axios";
import { CHANGE_CUSTOMER_SELECTED_PRODUCT } from "../constants/action_types"


export function changeCustomerSelectedProduct(prodId) {
    // @TODO: add rest call
    const payload = {
            id: prodId, 
            name: "Prod1",
            manufacturer: "Man1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Vivamus congue pellentesque risus in tempus. Phasellus condimentum \
                quam non placerat convallis. Nunc quis libero porttitor, semper \
                purus sed, mollis libero. Donec ornare lorem lacus, sit amet bibendum \
                libero pharetra id. Fusce luctus lectus in sapien efficitur, nec \
                sodales arcu consectetur. Sed vestibulum fermentum velit vel ullamcorper. \
                Vivamus sit amet sem urna. Ut et urna sed ante feugiat malesuada.",
            price: "123.45 $"
    };
    
    return { type: CHANGE_CUSTOMER_SELECTED_PRODUCT, payload };
}