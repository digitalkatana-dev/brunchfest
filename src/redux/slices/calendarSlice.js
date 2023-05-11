import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getMonth } from '../../util/helpers';

export const calendarAdapter = createEntityAdapter();
const initialState = calendarAdapter.getInitialState({
	loading: false,
	date: '',
	currentMonth: getMonth(),
});

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setDate: (state, action) => {
			state.date = action.payload;
		},
		setCurrentMonth: (state, action) => {
			state.currentMonth = action.payload;
		},
	},
});

export const { setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
