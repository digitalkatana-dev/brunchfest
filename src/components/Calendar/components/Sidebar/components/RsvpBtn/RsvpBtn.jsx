import { useDispatch, useSelector } from 'react-redux';
import './rsvpbtn.scss';
import { toggleOpen } from '../../../../../../redux/slices/calendarSlice';

const RsvpBtn = () => {
	const { daySelected } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (daySelected) {
			dispatch(toggleOpen());
		}
	};

	return (
		<button className='rsvp-btn' onClick={handleClick}>
			<img src='plus.svg' alt='' className='rsvp-btn-icon' />
			<span>RSVP</span>
		</button>
	);
};

export default RsvpBtn;
