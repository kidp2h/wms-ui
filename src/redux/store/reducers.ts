import { employeeApi, authApi } from '@/services';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from '@/redux/features/auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [employeeApi.reducerPath]: employeeApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth,
});

export const reducers = persistReducer(persistConfig, rootReducer);
