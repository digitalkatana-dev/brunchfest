import { useDispatch, useSelector } from 'react-redux';
import { getMonth } from '../../util/helpers';
import CalendarHead from './components/CalendarHead';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
// import './calendar.scss';

const Calendar = () => {
	const { currentMonth } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	return (
		<>
			<div className='h-screen flex flex-columns'>
				<CalendarHead />
				<div className='flex flex-1'>
					<Sidebar />
					<Month month={currentMonth} />
				</div>
			</div>
		</>
	);
};

export default Calendar;
