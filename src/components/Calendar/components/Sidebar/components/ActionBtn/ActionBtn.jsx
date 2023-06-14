import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from '../../../../../../redux/slices/calendarSlice';
import './actionBtn.scss';

const ActionBtn = ({ label, actionType }) => {
	const { daySelected, selectedEvent } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (daySelected && selectedEvent) {
			dispatch(toggleOpen(true));
		} else if (daySelected) {
			window.location = '/create';
		}
	};

	return (
		<button className='action-btn' onClick={handleClick}>
			<img src='plus.svg' alt='' className='action-btn-icon' />
			<span>{selectedEvent ? label : 'Create'}</span>
		</button>
	);
};

export default ActionBtn;
