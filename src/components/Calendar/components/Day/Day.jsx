import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setDaySelected,
	toggleOpen,
} from '../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import TouchableOpacity from '../../../TouchableOpacity';
import './day.scss';

const Day = ({ day, rowIdx }) => {
	const { savedEvents } = useSelector((state) => state.calendar);
	const [dayEvents, setDayEvents] = useState([]);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setDaySelected(day));
		dispatch(toggleOpen());
	};

	const getCurrentDayClass = () => {
		return day.format('MM-DD-YY') === dayjs().format('MM-DD-YY') ? 'today' : '';
	};

	useEffect(() => {
		const events = savedEvents.filter(
			(event) => dayjs(event.day).format('MM-DD-YY') === day.format('MM-DD-YY')
		);
		console.log('new events', events);
		setDayEvents(events);
	}, [savedEvents, day]);

	return (
		<TouchableOpacity
			onClick={handleClick}
			inlineStyle={{ border: '1px solid lightgrey' }}
		>
			<Grid item xs={1} className='cell'>
				<header>
					{rowIdx === 0 && <p className='abv'>{day.format('ddd')}</p>}
					<p className={`${getCurrentDayClass()}`}>{day.format('D')}</p>
				</header>
				{dayEvents?.map((item, idx) => (
					<div
						key={idx}
						style={{
							backgroundColor: `${item.label}`,
							width: 'inherit',
							borderRadius: '40px',
							fontSize: 'xx-small',
							color: 'whitesmoke',
						}}
					>
						{item.headcount}
					</div>
				))}
			</Grid>
		</TouchableOpacity>
	);
};

export default Day;
