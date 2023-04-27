import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const navAdapter = createEntityAdapter();
const initialState = navAdapter.getInitialState({
	menuOpen: false,
});

export const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setMenuOpen: (state) => {
			state.menuOpen = !state.menuOpen;
		},
	},
});

export const { setMenuOpen } = navSlice.actions;

export default navSlice.reducer;
