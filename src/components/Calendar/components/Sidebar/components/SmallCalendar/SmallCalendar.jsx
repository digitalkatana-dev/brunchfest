import { Grid, IconButton } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentMonthSmall,
	setMonthIndexSmall,
} from '../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './smallCal.scss';

const SmallCalendar = () => {
	const { currentMonthSmall, monthIndexSmall } = useSelector(
		(state) => state.calendar
	);
	const dispatch = useDispatch();

	const handlePrev = () => {
		dispatch(setMonthIndexSmall(monthIndexSmall - 1));
	};

	const handleNxt = () => {
		dispatch(setMonthIndexSmall(monthIndexSmall + 1));
	};

	useEffect(() => {
		dispatch(setCurrentMonthSmall(monthIndexSmall));
	}, [dispatch, monthIndexSmall]);

	return (
		<div className='small-cal'>
			<header className='small-head'>
				<p>
					{dayjs(new Date(dayjs().year(), monthIndexSmall)).format('MMMM YYYY')}
				</p>
				<IconButton className='icon-btn left' onClick={handlePrev}>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton className='icon-btn' onClick={handleNxt}>
					<ChevronRightIcon />
				</IconButton>
			</header>
			<div>
				<Grid container columns={7}>
					{currentMonthSmall[0].map((day, i) => (
						<span key={i}>{day.format('dd').charAt(0)}</span>
					))}
					{currentMonthSmall.map((row, i) => (
						<Fragment key={i}>
							{row.map((day, idx) => (
								<button key={idx}>
									<span>{day.format('D')}</span>
								</button>
							))}
						</Fragment>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default SmallCalendar;
