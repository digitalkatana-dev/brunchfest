import {
	createEntityAdapter,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { getMonth } from '../../util/helpers';
import { labelClasses } from '../../util/data';
import dayjs from 'dayjs';
import brunchApi from '../../api/brunchApi';

export const createEvent = createAsyncThunk(
	'calendar/create_event',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await brunchApi.post('/events', eventInfo);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getAllEvents = createAsyncThunk(
	'calendar/get_all_events',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await brunchApi.get('/events');
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getSingleEvent = createAsyncThunk(
	'calendar/get_single_event',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await brunchApi.get(`/events/${eventInfo}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const attendEvent = createAsyncThunk(
	'calendar/rsvp',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const res = await brunchApi.put('/events/add-attendee', eventInfo);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteEvent = createAsyncThunk(
	'calendar/delete_event',
	async (eventInfo, { rejectWithValue }) => {
		try {
			const delRes = await brunchApi.delete(`/events/${eventInfo}`);
			const upRes = await brunchApi.get('/events');

			return { deleted: delRes.data, updated: upRes.data };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const calendarAdapter = createEntityAdapter();
const initialState = calendarAdapter.getInitialState({
	loading: false,
	actionType: null,
	open: false,
	currentMonth: getMonth(),
	monthIndex: dayjs().month(),
	currentMonthSmall: getMonth(),
	monthIndexSmall: dayjs().month(),
	daySelected: null,
	eventTime: '',
	eventLoc: '',
	headcount: '',
	selectedLabel: labelClasses[0],
	savedEvents: null,
	selectedEvent: null,
	success: null,
	errors: null,
});

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setActionType: (state, action) => {
			state.actionType = action.payload;
		},
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
		setEventTime: (state, action) => {
			state.eventTime = action.payload;
		},
		setEventLoc: (state, action) => {
			state.eventLoc = action.payload;
		},
		setHeadcount: (state, action) => {
			state.headcount = action.payload;
		},
		setSelectedLabel: (state, action) => {
			state.selectedLabel = action.payload;
		},
		setSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload;
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
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = [...state.savedEvents, action.payload];
				state.eventTime = '';
				state.eventLoc = '';
			})
			.addCase(createEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getAllEvents.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getAllEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.savedEvents = action.payload;
			})
			.addCase(getAllEvents.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(attendEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(attendEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.savedEvents = action.payload.updatedAll;
				state.selectedEvent = action.payload.updatedEvent;
			})
			.addCase(attendEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.deleted;
				state.savedEvents = action.payload.updated;
				state.selectedEvent = null;
			})
			.addCase(deleteEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getSingleEvent.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getSingleEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedEvent = action.payload;
			})
			.addCase(getSingleEvent.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	setActionType,
	toggleOpen,
	setMonthIndex,
	setCurrentMonth,
	setCurrentMonthSmall,
	setMonthIndexSmall,
	setDaySelected,
	setEventTime,
	setEventLoc,
	setHeadcount,
	setSelectedLabel,
	setSelectedEvent,
	addEvent,
	updateEvent,
	clearSuccess,
	clearErrors,
} = calendarSlice.actions;

export default calendarSlice.reducer;
