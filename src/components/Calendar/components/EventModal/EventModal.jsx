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
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setHeadcount,
	setSelectedLabel,
	createEvent,
	attendEvent,
	cancelRsvp,
	updateEvent,
	sendReminders,
	deleteEvent,
	setSelectedEvent,
	clearErrors,
} from '../../../../redux/slices/calendarSlice';
import { labelClasses } from '../../../../util/data';
import dayjs from 'dayjs';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import CloseIcon from '@mui/icons-material/Close';
import DetailsIcon from '@mui/icons-material/Details';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import './eventModal.scss';

const EventModal = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		open,
		daySelected,
		eventType,
		eventTypeInput,
		eventTime,
		eventLoc,
		headcount,
		selectedLabel,
		selectedEvent,
		eventsAttending,
		errors,
	} = useSelector((state) => state.calendar);
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

	const alreadyAttending = eventsAttending?.find(
		(item) => item === selectedEvent?._id
	);

	const handleClose = () => {
		dispatch(toggleOpen(false));
		dispatch(setSelectedEvent(null));
	};

	const handleChange = (input, value) => {
		switch (input) {
			case 'type':
				dispatch(setEventType(value));
				break;

			case 'other':
				dispatch(setEventTypeInput(value));
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

	const handleReminders = () => {
		const data = {
			eventId: selectedEvent?._id,
		};
		dispatch(sendReminders(data));
	};

	const handleDelete = () => {
		dispatch(deleteEvent(selectedEvent?._id));
		dispatch(toggleOpen(false));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data;
		if (!selectedEvent) {
			data = {
				date: daySelected.format('M/DD/YYYY'),
				type: eventType === 'other' ? eventTypeInput : eventType,
				time: eventTime,
				location: eventLoc,
				label: selectedLabel,
			};
			dispatch(createEvent(data));
		} else if (selectedEvent && eventAuthor === currentUser) {
			data = {
				_id: selectedEvent?._id,
				...(eventType !== selectedEvent?.type && {
					type: eventType === 'other' ? eventTypeInput : eventType,
				}),
				...(eventTime !== selectedEvent?.time && { time: eventTime }),
				...(eventLoc !== selectedEvent?.location && { location: eventLoc }),
				...(selectedLabel !== selectedEvent?.label && {
					label: selectedLabel,
				}),
			};
			dispatch(updateEvent(data));
		} else if (selectedEvent) {
			data = {
				eventId: selectedEvent?._id,
				headcount,
			};
			dispatch(attendEvent(data));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='s'>
			<DialogTitle className='title'>
				{selectedEvent && eventAuthor === currentUser ? (
					<Tooltip title='Send Reminders' placement='top'>
						<IconButton onClick={handleReminders}>
							<SendToMobileIcon className='send-reminder' />
						</IconButton>
					</Tooltip>
				) : (
					<DragHandleIcon />
				)}
				<div className='content-switch'>
					<h6>
						{!selectedEvent
							? 'Create'
							: selectedEvent && eventAuthor === currentUser
							? 'Manage'
							: 'RSVP'}
					</h6>
				</div>
				<IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{user && (
					<>
						{!selectedEvent ||
						(selectedEvent && eventAuthor === currentUser) ? (
							<>
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
								<FormControl size='small'>
									<div className='event-type'>
										<InputLabel id='event-type'>Event Type</InputLabel>
										<Select
											labelId='event-type'
											value={eventType}
											label='Event Type'
											onChange={(e) => handleChange('type', e.target.value)}
											fullWidth
										>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											<MenuItem value='Brunch'>Brunch</MenuItem>
											<MenuItem value='Dinner'>Dinner</MenuItem>
											<MenuItem value='Movies'>Movies</MenuItem>
											<MenuItem value='Game Night'>Game Night</MenuItem>
											<MenuItem value='Party'>Party</MenuItem>
											<MenuItem value='other'>Other</MenuItem>
										</Select>
									</div>
									{eventType === 'other' && (
										<TextField
											sx={{ marginBottom: '20px' }}
											label='Go on...'
											variant='standard'
											value={eventTypeInput}
											onChange={(e) => handleChange('other', e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<DetailsIcon className='add-on' />
													</InputAdornment>
												),
											}}
										/>
									)}
									<TextField
										sx={{ marginBottom: '20px' }}
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
							</>
						) : (
							<FormControl>
								<div className='event-type'>
									<LocalActivityIcon className='icon' />
									<h5>{selectedEvent?.type}</h5>
								</div>
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
						)}
					</>
				)}
				{!user && <DialogContentText>Sign in to RSVP!</DialogContentText>}
			</DialogContent>
			{user && (
				<DialogActions
					sx={{
						justifyContent:
							selectedEvent && eventAuthor === currentUser
								? 'space-between'
								: 'flex-end',
					}}
				>
					{selectedEvent && alreadyAttending && (
						<Tooltip title='Undo' placement='right'>
							<IconButton onClick={handleUndo}>
								<UndoIcon className='undo' />
							</IconButton>
						</Tooltip>
					)}
					{selectedEvent && !alreadyAttending && (
						<Button onClick={handleSubmit}>Submit</Button>
					)}
					{selectedEvent && eventAuthor === currentUser && (
						<Tooltip title='Delete' placement='right'>
							<IconButton onClick={handleDelete}>
								<DeleteIcon className='delete' />
							</IconButton>
						</Tooltip>
					)}
					{!selectedEvent && (
						<Button
							disabled={!eventType || !eventTime || !eventLoc}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};

export default EventModal;
