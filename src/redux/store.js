import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import user from './reducers/user';

const persistConfig = {
  key: 'toptal_app_redux',
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
