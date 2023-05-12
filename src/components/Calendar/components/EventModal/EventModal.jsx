import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	setHeadcount,
	setSelectedLabel,
	addEvent,
} from '../../../../redux/slices/calendarSlice';
import { labelClasses } from '../../../../util/data';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import './eventModal.scss';

const EventModal = () => {
	const { user } = useSelector((state) => state.auth);
	const { open, daySelected, headcount, selectedLabel } = useSelector(
		(state) => state.calendar
	);
	const tagStyle = (item) => {
		const data = {
			width: 15,
			height: 15,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: `${item}`,
			borderRadius: '100%',
			color: 'whitesmoke',
			padding: 2,
		};

		return data;
	};

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(toggleOpen());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			id: Date.now(),
			eventId: 5,
			label: selectedLabel,
			headcount,
			day: daySelected.valueOf(),
		};

		dispatch(addEvent(data));
		dispatch(setHeadcount(''));
		dispatch(toggleOpen());
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle className='title'>
				<DragHandleIcon />
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{user ? (
					<>
						<div className='event-date'>
							<ScheduleIcon className='icon' />
							<p>{daySelected?.format('dddd, MMMM DD')}</p>
						</div>
						<div className='event-loc'>
							<MyLocationIcon className='icon' />
							<p>Miguels</p>
						</div>
						<div className='event-tags'>
							<BookmarkBorderIcon className='icon' />
							<div className='tag-swatch'>
								{labelClasses.map((item, i) => (
									<span
										key={i}
										onClick={() => dispatch(setSelectedLabel(item))}
										style={tagStyle(item)}
									>
										{selectedLabel === item && <CheckIcon fontSize='5' />}
									</span>
								))}
							</div>
						</div>
						<DialogContentText>
							Hello, {user.firstName}! How many in your party?
						</DialogContentText>
						<TextField
							label='Headcount'
							variant='standard'
							fullWidth
							onChange={(e) => dispatch(setHeadcount(e.target.value))}
						/>
					</>
				) : (
					<DialogContentText>Sign in to RSVP!</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSubmit}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EventModal;
