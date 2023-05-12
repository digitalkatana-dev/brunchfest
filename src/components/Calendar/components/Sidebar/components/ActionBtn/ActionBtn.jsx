import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	setActionType,
} from '../../../../../../redux/slices/calendarSlice';
import './actionBtn.scss';

const ActionBtn = ({ label, actionType }) => {
	const { daySelected } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (daySelected) {
			dispatch(setActionType(actionType));
			dispatch(toggleOpen());
		}
	};

	return (
		<button className='action-btn' onClick={handleClick}>
			<img src='plus.svg' alt='' className='action-btn-icon' />
			<span>{label}</span>
		</button>
	);
};

export default ActionBtn;
