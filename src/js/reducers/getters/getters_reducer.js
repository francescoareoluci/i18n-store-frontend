import { combineReducers } from 'redux'

import { adminReducer } from "./admin_reducer";
import { customerReducer } from "./customer_reducer";
import { commonReducer } from "./common_reducer";


export const gettersReducer = combineReducers({
    admin: adminReducer,
    customer: customerReducer,
    common: commonReducer
});