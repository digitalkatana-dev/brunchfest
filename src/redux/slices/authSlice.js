import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import brunchApi from '../../api/brunchApi';

export const register = createAsyncThunk(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const res = await brunchApi.post('/users/register', data);
			const { token, userData } = res.data;
			await localStorage.setItem('token', token);
			return userData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const res = await brunchApi.post('/users/login', data);
			const { token, userData } = res.data;
			await localStorage.setItem('token', token);
			return userData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const generatePasswordToken = createAsyncThunk(
	'auth/generate_password_token',
	async (userData, { rejectWithValue }) => {
		try {
			const res = await brunchApi.post(
				'/users/forgot-password-token',
				userData
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'auth/reset_password',
	async (userData, { rejectWithValue }) => {
		try {
			const res = await brunchApi.post('/users/reset-password', userData);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({
	loading: false,
	authType: 'Login',
	name: '',
	email: '',
	password: '',
	show: false,
	user: null,
	// user: { name: 'Big John' },
	success: null,
	errors: null,
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthType: (state, action) => {
			state.authType = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setShow: (state) => {
			state.show = !state.show;
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
		logout: (state) => {
			state.loading = false;
			state.authType = 'Login';
			state.name = '';
			state.email = '';
			state.password = '';
			state.user = null;
			state.success = null;
			state.errors = null;
			localStorage.removeItem('token');
			window.location = '/';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.name = '';
				state.email = '';
				state.password = '';
				state.user = action.payload;
				state.errors = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.email = '';
				state.password = '';
				state.user = action.payload;
				state.errors = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(generatePasswordToken.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(generatePasswordToken.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(generatePasswordToken.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				authAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				authAdapter.removeAll(state);
			});
	},
});

export const {
	setAuthType,
	setName,
	setEmail,
	setPassword,
	setShow,
	setErrors,
	clearErrors,
	clearSuccess,
	logout,
} = authSlice.actions;

export default authSlice.reducer;
