import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMonth } from '../../redux/slices/calendarSlice';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import './calendar.scss';

const Calendar = () => {
	const { currentMonth, monthIndex } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCurrentMonth(monthIndex));
	}, [dispatch, monthIndex]);

	return (
		<>
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
