import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getMonth } from '../../util/helpers';
import { labelClasses } from '../../util/data';
import dayjs from 'dayjs';

export const calendarAdapter = createEntityAdapter();
const initialState = calendarAdapter.getInitialState({
	loading: false,
	open: false,
	currentMonth: getMonth(),
	monthIndex: dayjs().month(),
	currentMonthSmall: getMonth(),
	monthIndexSmall: dayjs().month(),
	daySelected: null,
	headcount: '',
	selectedLabel: labelClasses[0],
	savedEvents: [],
	// dayEvents: [],
});

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		toggleOpen: (state) => {
			state.open = !state.open;
		},
		setCurrentMonth: (state, action) => {
			state.currentMonth = getMonth(action.payload);
		},
		setMonthIndex: (state, action) => {
			state.monthIndex = action.payload;
		},
		setCurrentMonthSmall: (state, action) => {
			state.currentMonthSmall = getMonth(action.payload);
		},
		setMonthIndexSmall: (state, action) => {
			state.monthIndexSmall = action.payload;
		},
		setDaySelected: (state, action) => {
			state.daySelected = action.payload;
		},
		setHeadcount: (state, action) => {
			state.headcount = action.payload;
		},
		setSelectedLabel: (state, action) => {
			state.selectedLabel = action.payload;
		},
		addEvent: (state, action) => {
			state.savedEvents = [...state.savedEvents, action.payload];
		},
		updateEvent: (state, action) => {
			const updated = () => {
				return state.savedEvents.map((event) =>
					event.id === action.payload.id ? action.payload : event
				);
			};

			state.savedEvents = updated();
		},
		deleteEvent: (state, action) => {
			const updated = () => {
				return state.savedEvents.filter(
					(event) => event.id !== action.payload.id
				);
			};

			state.savedEvents = updated();
		},
		// setDayEvents: (state, action) => {
		// 	state.dayEvents = action.payload;
		// },
	},
});

export const {
	toggleOpen,
	setMonthIndex,
	setCurrentMonth,
	setCurrentMonthSmall,
	setMonthIndexSmall,
	setDaySelected,
	setHeadcount,
	setSelectedLabel,
	addEvent,
	updateEvent,
	deleteEvent,
	// setDayEvents,
} = calendarSlice.actions;

export default calendarSlice.reducer;
