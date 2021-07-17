import { UNAUTH } from "../constants/action_types";


const dispatchUnauth = () => (
    { 
        type: UNAUTH, 
        payload: { 
            unauth: true 
        } 
    }
);

export default dispatchUnauth;