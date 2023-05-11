import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getMonth } from '../../util/helpers';
import dayjs from 'dayjs';

export const calendarAdapter = createEntityAdapter();
const initialState = calendarAdapter.getInitialState({
	loading: false,
	date: '',
	currentMonth: getMonth(),
	monthIndex: dayjs().month(),
});

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setDate: (state, action) => {
			state.date = action.payload;
		},
		setCurrentMonth: (state, action) => {
			state.currentMonth = getMonth(action.payload);
		},
		setMonthIndex: (state, action) => {
			state.monthIndex = action.payload;
		},
	},
});

export const { setDate, setMonthIndex, setCurrentMonth } =
	calendarSlice.actions;

export default calendarSlice.reducer;
