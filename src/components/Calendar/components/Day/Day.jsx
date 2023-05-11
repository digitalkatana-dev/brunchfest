import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import './day.scss';

const Day = ({ day, rowIdx }) => {
	const getCurrentDayClass = () => {
		return day.format('MM-DD-YY') === dayjs().format('MM-DD-YY') ? 'today' : '';
	};

	return (
		<Grid item xs={1} className='cell'>
			<header>
				{rowIdx === 0 && <p className='abv'>{day.format('ddd')}</p>}
				<p className={`${getCurrentDayClass()}`}>{day.format('D')}</p>
			</header>
		</Grid>
	);
};

export default Day;
