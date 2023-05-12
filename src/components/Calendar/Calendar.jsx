import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentMonth,
	getAllEvents,
} from '../../redux/slices/calendarSlice';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';
import './calendar.scss';

const Calendar = () => {
	const { currentMonth, monthIndex, savedEvents } = useSelector(
		(state) => state.calendar
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!savedEvents) {
			dispatch(getAllEvents());
		}
	}, [savedEvents, dispatch]);

	useEffect(() => {
		dispatch(setCurrentMonth(monthIndex));
	}, [dispatch, monthIndex]);

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
		</>
	);
};

export default Calendar;
