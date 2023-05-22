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
	Tooltip,
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
	cancelRsvp,
	updateEvent,
	deleteEvent,
	setSelectedEvent,
	clearErrors,
} from '../../../../redux/slices/calendarSlice';
import { labelClasses } from '../../../../util/data';
import dayjs from 'dayjs';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
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
		myEvents,
		errors,
	} = useSelector((state) => state.calendar);
	const [checked, setChecked] = useState(false);
	const tagStyle = (item) => {
		const data = {
			width: 20,
			height: 20,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: `${item}`,
			borderRadius: '100%',
			color: 'whitesmoke',
		};

		return data;
	};
	const eventAuthor = selectedEvent?.createdBy;
	const currentUser = user?._id;
	const dispatch = useDispatch();

	const alreadyAttending = myEvents?.find(
		(item) => item === selectedEvent?._id
	);

	const handleClose = () => {
		dispatch(toggleOpen(false));
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

	const handleUndo = () => {
		const data = {
			eventId: selectedEvent?._id,
		};
		dispatch(cancelRsvp(data));
	};

	const handleDelete = () => {
		dispatch(deleteEvent(selectedEvent?._id));
		dispatch(toggleOpen(false));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data;
		if (!checked && selectedEvent) {
			data = {
				eventId: selectedEvent?._id,
				headcount,
			};
			dispatch(attendEvent(data));
		} else if (checked && eventAuthor === currentUser) {
			data = {
				_id: selectedEvent?._id,
				...(eventTime && { time: eventTime }),
				...(eventLoc && { location: eventLoc }),
				...(selectedLabel !== selectedEvent?.label && {
					label: selectedLabel,
				}),
			};
			dispatch(updateEvent(data));
		} else if (checked && !selectedEvent) {
			data = {
				date: daySelected.format('M/DD/YYYY'),
				time: eventTime,
				location: eventLoc,
				label: selectedLabel,
			};
			dispatch(createEvent(data));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs'>
			<DialogTitle className='title'>
				{selectedEvent && checked ? (
					<Tooltip title='Send Reminders' placement='top'>
						<IconButton>
							<SendToMobileIcon className='send-reminder' />
						</IconButton>
					</Tooltip>
				) : (
					<DragHandleIcon />
				)}
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
									value={eventTime}
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
									value={eventLoc}
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
												onClick={() => handleChange('label', item)}
												style={tagStyle(item)}
											>
												{selectedLabel === item && <CheckIcon fontSize='4' />}
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
									{alreadyAttending ? (
										<>
											<DialogContentText>
												RSVP received, you're all set!
											</DialogContentText>
										</>
									) : (
										<>
											<DialogContentText>
												Hello, {user.firstName}! How many in your party?
											</DialogContentText>
											<TextField
												disabled={!selectedEvent}
												sx={{ marginTop: '15px' }}
												size='small'
												label='Headcount'
												variant='standard'
												value={headcount}
												onChange={(e) => handleChange('count', e.target.value)}
												onFocus={() => dispatch(clearErrors())}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<GroupAddIcon className='add-on' />
														</InputAdornment>
													),
												}}
											/>
											{errors?.headcount && (
												<h6 className='error'>{errors?.headcount}</h6>
											)}
										</>
									)}
								</FormControl>
							</>
						)}
					</>
				)}
				{!user && <DialogContentText>Sign in to RSVP!</DialogContentText>}
			</DialogContent>
			{user && (
				<DialogActions
					sx={{
						justifyContent:
							eventAuthor === currentUser && checked
								? 'space-between'
								: 'flex-end',
					}}
				>
					{!checked && alreadyAttending && (
						<Tooltip title='Undo' placement='right'>
							<IconButton onClick={handleUndo}>
								<UndoIcon className='undo' />
							</IconButton>
						</Tooltip>
					)}
					{!checked && !alreadyAttending && (
						<Button onClick={handleSubmit}>Submit</Button>
					)}
					{checked && eventAuthor === currentUser && (
						<Tooltip title='Delete' placement='right'>
							<IconButton onClick={handleDelete}>
								<DeleteIcon className='delete' />
							</IconButton>
						</Tooltip>
					)}
					{checked && <Button onClick={handleSubmit}>Submit</Button>}
				</DialogActions>
			)}
		</Dialog>
	);
};

export default EventModal;
