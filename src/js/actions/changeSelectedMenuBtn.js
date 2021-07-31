import { CHANGE_SELECTED_MENU_BTN } from "../constants/action_types"


const dispatchSelectedMenuBtn = payload => (
    { type: CHANGE_SELECTED_MENU_BTN, payload }
);

export function changeSelectedMenuBtn(idx) {
    const payload = { selectedMenuBtn: idx };
    return dispatchSelectedMenuBtn(payload);
}