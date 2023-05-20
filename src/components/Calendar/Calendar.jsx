import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import {
	setCurrentMonth,
	getAllEvents,
	setMyEvents,
	clearSuccess,
	clearErrors,
} from '../../redux/slices/calendarSlice';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';
import './calendar.scss';

const Calendar = () => {
	const { user } = useSelector((state) => state.auth);
	const { currentMonth, monthIndex, savedEvents, success, errors } =
		useSelector((state) => state.calendar);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMyEvents(user?.myEvents));
	}, [user]);

	useEffect(() => {
		if (!savedEvents) {
			dispatch(getAllEvents());
		}
	}, [savedEvents]);

	useEffect(() => {
		dispatch(setCurrentMonth(monthIndex));
	}, [monthIndex]);

	useEffect(() => {
		if (success || errors?.event) {
			setOpen(true);
			dispatch(getUser(user._id));
			setTimeout(() => {
				dispatch(clearSuccess());
				dispatch(clearErrors());
			}, 8000);
		}
	}, [success, errors]);

	return (
		<>
			<EventModal />
			<div className='calendar'>
				<CalendarHead />
				<div className='container'>
					<Sidebar />
					<Month month={currentMonth} />
				</div>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={7000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					severity={success ? 'success' : 'error'}
				>
					{success && <>{success.message}</>}
					{errors?.event && <>{errors.event}</>}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Calendar;
