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

import { authReducer } from "../reducers/auth/auth_reducer";
import { gettersReducer } from "../reducers/getters/getters_reducer";
import { notificationsReducer } from "../reducers/notifications/notifications_reducer";


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  getters: gettersReducer,
  notifications: notificationsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };