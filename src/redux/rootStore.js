import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import calendarReducer from './slices/calendarSlice';
import navReducer from './slices/navSlice';

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['user'],
};

const calendarPersistConfig = {
	key: 'calendar',
	storage,
	whitelist: ['myEvents'],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		calendar: persistReducer(calendarPersistConfig, calendarReducer),
		nav: navReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
