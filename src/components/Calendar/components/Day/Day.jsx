import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setDaySelected,
	toggleOpen,
	setSelectedEvent,
} from '../../../../redux/slices/calendarSlice';
import { thirdSunday } from '../../../../util/helpers';
import dayjs from 'dayjs';
import TouchableOpacity from '../../../TouchableOpacity';
import './day.scss';

const Day = ({ day, rowIdx }) => {
	const { savedEvents } = useSelector((state) => state.calendar);
	const [dayEvents, setDayEvents] = useState([]);
	const dispatch = useDispatch();
	const check = dayjs(thirdSunday(day.$y, day.$M + 1)).format('MM-DD-YYYY');
	const currentDay = dayjs(day).format('MM-DD-YYYY');

	const handleClick = () => {
		dispatch(setDaySelected(day));
		dispatch(toggleOpen(true));
	};

	const getCurrentDayClass = () => {
		return day.format('MM-DD-YY') === dayjs().format('MM-DD-YY') ? 'today' : '';
	};

	useEffect(() => {
		const events = savedEvents?.filter(
			(event) => dayjs(event.date).format('MM-DD-YY') === day.format('MM-DD-YY')
		);
		setDayEvents(events);
	}, [savedEvents, day]);

	return (
		<>
			{check === currentDay ? (
				<TouchableOpacity
					onClick={handleClick}
					inlineStyle={{ border: '1px solid lightgrey', zIndex: 1 }}
				>
					<Grid item xs={1} className='cell'>
						<header>
							<p className={`${getCurrentDayClass()}`}>{day.format('D')}</p>
						</header>
						{dayEvents?.map((item) => (
							<div
								key={item._id}
								onClick={() => dispatch(setSelectedEvent(item))}
								style={{
									backgroundColor: `${item.label}`,
								}}
								className='day-event'
							>
								{item.location}
							</div>
						))}
					</Grid>
				</TouchableOpacity>
			) : (
				<div className='unavailable'>
					<Grid item xs={1} className='cell'>
						<header>
							{rowIdx === 0 && <p className='abv'>{day.format('ddd')}</p>}
							<p className={`${getCurrentDayClass()}`}>{day.format('D')}</p>
						</header>
					</Grid>
				</div>
			)}
		</>
	);
};

export default Day;
