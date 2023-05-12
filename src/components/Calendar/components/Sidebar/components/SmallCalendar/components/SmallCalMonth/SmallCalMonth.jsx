import { Grid } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setMonthIndex,
	setDaySelected,
} from '../../../../../../../../redux/slices/calendarSlice';
import dayjs from 'dayjs';
import TouchableOpacity from '../../../../../../../TouchableOpacity';

const SmallCalMonth = () => {
	const { currentMonthSmall, monthIndexSmall, daySelected } = useSelector(
		(state) => state.calendar
	);
	const dispatch = useDispatch();

	const getDayClass = (day) => {
		const format = 'MM-DD-YY';
		const nowDay = dayjs().format(format);
		const currDay = day.format(format);
		const slcDay = daySelected && daySelected.format(format);
		if (nowDay === currDay) {
			return 'today';
		} else if (currDay === slcDay) {
			return 'selected-day';
		} else {
			return '';
		}
	};

	const handleClick = (day) => {
		dispatch(setMonthIndex(monthIndexSmall));
		dispatch(setDaySelected(day));
	};

	return (
		<div>
			<Grid container columns={7}>
				{currentMonthSmall[0].map((day, i) => (
					<Grid item xs={1} key={i} className='cell'>
						<span>{day.format('dd').charAt(0)}</span>
					</Grid>
				))}
			</Grid>
			{currentMonthSmall.map((row, i) => (
				<Fragment key={i}>
					<Grid container columns={7}>
						{row.map((day, idx) => (
							<Grid item xs={1} key={idx} className='cell'>
								<TouchableOpacity onClick={() => handleClick(day)}>
									<span className={`${getDayClass(day)}`}>
										{day.format('D')}
									</span>
								</TouchableOpacity>
							</Grid>
						))}
					</Grid>
				</Fragment>
			))}
		</div>
	);
};

export default SmallCalMonth;
