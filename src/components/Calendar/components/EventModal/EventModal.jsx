import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputAdornment,
	Switch,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	setEventTime,
	setEventLoc,
	setHeadcount,
	setSelectedLabel,
	createEvent,
	attendEvent,
	setSelectedEvent,
} from '../../../../redux/slices/calendarSlice';
import { labelClasses } from '../../../../util/data';
import dayjs from 'dayjs';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import './eventModal.scss';

const EventModal = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		open,
		daySelected,
		eventTime,
		eventLoc,
		headcount,
		selectedLabel,
		selectedEvent,
		errors,
	} = useSelector((state) => state.calendar);
	const [checked, setChecked] = useState(false);
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
		dispatch(setSelectedEvent(null));
	};

	const handleChange = (input, value) => {
		switch (input) {
			case 'type':
				setChecked(value);
				break;

			case 'time':
				dispatch(setEventTime(value));
				break;

			case 'loc':
				dispatch(setEventLoc(value));
				break;

			case 'label':
				dispatch(setSelectedLabel(value));
				break;

			case 'count':
				dispatch(setHeadcount(value));
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data;
		switch (checked) {
			case true:
				data = {
					date: daySelected.format('M/DD/YYYY'),
					time: eventTime,
					location: eventLoc,
					label: selectedLabel,
				};
				dispatch(createEvent(data));
				break;

			case false && selectedEvent:
				data = {
					eventId: selectedEvent?._id,
					headcount,
				};
				dispatch(attendEvent(data));
				break;

			default:
				break;
		}
		dispatch(toggleOpen());
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs'>
			<DialogTitle className='title'>
				<DragHandleIcon />
				{user?.isAdmin && (
					<div className='content-switch'>
						<h6>RSVP</h6>
						<Switch
							checked={checked}
							size='small'
							color='secondary'
							onChange={(e) => handleChange('type', e.target.checked)}
						/>
						<h6>Create</h6>
					</div>
				)}
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{user && (
					<>
						{user.isAdmin && checked ? (
							<FormControl>
								<div className='event-date'>
									<CalendarMonthIcon className='icon' />
									<h5>
										{selectedEvent ? (
											<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
										) : (
											<>{daySelected?.format('dddd, MMMM DD')}</>
										)}
									</h5>
								</div>
								<TextField
									sx={{ marginBottom: '20px' }}
									size='small'
									label='Time'
									variant='standard'
									defaultValue={selectedEvent?.time}
									onChange={(e) => handleChange('time', e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<ScheduleIcon className='add-on' />
											</InputAdornment>
										),
									}}
								/>
								{errors && errors.time && (
									<h6 className='error'>{errors.time}</h6>
								)}
								<TextField
									sx={{ marginBottom: '25px' }}
									size='small'
									label='Location'
									variant='standard'
									defaultValue={selectedEvent?.location}
									onChange={(e) => handleChange('loc', e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<MyLocationIcon className='add-on' />
											</InputAdornment>
										),
									}}
								/>
								{errors && errors.location && (
									<h6 className='error'>{errors.location}</h6>
								)}
								<div className='event-tags'>
									<BookmarkBorderIcon className='icon' />
									<div className='tag-swatch'>
										{labelClasses.map((item, i) => (
											<span
												key={i}
												onClick={() => dispatch(handleChange('label', item))}
												style={tagStyle(item)}
											>
												{selectedEvent ? (
													<>
														{selectedEvent.label === item && (
															<CheckIcon fontSize='5' />
														)}
													</>
												) : (
													<>
														{selectedLabel === item && (
															<CheckIcon fontSize='5' />
														)}
													</>
												)}
											</span>
										))}
									</div>
								</div>
							</FormControl>
						) : (
							<>
								<FormControl>
									<div className='event-date'>
										<ScheduleIcon className='icon' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
											) : (
												<>{daySelected?.format('dddd, MMMM DD')}</>
											)}
										</h5>
									</div>
									<div className='event-loc'>
										<MyLocationIcon className='icon' />
										<h5>
											{selectedEvent ? <>{selectedEvent.location}</> : 'TBD'}
										</h5>
									</div>
									<DialogContentText>
										Hello, {user.firstName}! How many in your party?
									</DialogContentText>
									<TextField
										sx={{ marginTop: '15px' }}
										size='small'
										label='Headcount'
										variant='standard'
										value={headcount}
										onChange={(e) => handleChange('count', e.target.value)}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<GroupAddIcon className='add-on' />
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
							</>
						)}
					</>
				)}
				{!user && <DialogContentText>Sign in to RSVP!</DialogContentText>}
			</DialogContent>
			{user && (
				<DialogActions>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default EventModal;
