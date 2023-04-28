import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const navAdapter = createEntityAdapter();
const initialState = navAdapter.getInitialState({
	menuOpen: false,
	menuView: 'auth',
});

export const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setMenuOpen: (state) => {
			state.menuOpen = !state.menuOpen;
		},
		setMenuView: (state, action) => {
			state.menuView = action.payload;
		},
	},
});

export const { setMenuOpen, setMenuView } = navSlice.actions;

export default navSlice.reducer;
