import { updateStateObject } from "../state_utils";
import { 
    CHANGE_SELECTED_MENU_BTN
} from "../../constants/action_types";


const initialState = {
    selectedMenuBtn: 1
}

export function uiReducer(state = initialState, action) {
    if (action.type == CHANGE_SELECTED_MENU_BTN) {
        return updateStateObject(state, { selectedMenuBtn: action.payload.selectedMenuBtn });
    }
    
    return state;
}