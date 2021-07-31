import { 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux'
import thunk from 'redux-thunk';
import { 
  persistStore, 
  persistReducer 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { LOGOUT } from "../constants/action_types";

import { authReducer } from "../reducers/auth/auth_reducer";
import { gettersReducer } from "../reducers/getters/getters_reducer";
import { notificationsReducer } from "../reducers/notifications/notifications_reducer";
import { uiReducer } from "../reducers/ui/ui_reducer";


const persistConfig = {
  key: 'root',
  storage,
}

const appReducer = combineReducers({
  auth: authReducer,
  getters: gettersReducer,
  notifications: notificationsReducer,
  ui: uiReducer
})

const rootReducer = (state, action) => {
  if (action.type == LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };