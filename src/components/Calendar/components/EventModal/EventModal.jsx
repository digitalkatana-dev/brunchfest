import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputAdornment,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleOpen,
	setEventType,
	setEventTypeInput,
	setEventTime,
	setEventLoc,
	setInvitedGuestInput,
	addInvitedGuest,
	removeInvitedGuest,
	setHeadcount,
	setSelectedLabel,
	createEvent,
	attendEvent,
	cancelRsvp,
	updateEvent,
	sendReminders,
	inviteSingle,
	deleteEvent,
	setSelectedEvent,
	setErrors,
	clearErrors,
} from '../../../../redux/slices/calendarSlice';
import { labelClasses } from '../../../../util/data';
import { validateInvitedGuest } from '../../../../util/validators';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconBtn from '../../../IconBtn';
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
		invitedGuestInput,
		invitedGuests,
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

			case 'guest':
				dispatch(setInvitedGuestInput(value));
				break;

			case 'count':
				dispatch(setHeadcount(value));
				break;

			default:
				break;
		}
	};

	const handleAdd = () => {
		const { valid, errors } = validateInvitedGuest(invitedGuestInput);

		if (!valid) {
			dispatch(setErrors(errors));
		} else {
			dispatch(addInvitedGuest(invitedGuestInput));
			dispatch(setInvitedGuestInput(''));
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

	const handleInvite = (item) => {
		const data = {
			type: selectedEvent?.type,
			date: selectedEvent?.date,
			time: selectedEvent?.time,
			guest: item,
		};

		dispatch(inviteSingle(data));
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
				...(invitedGuests.length > 0 && { invitedGuests }),
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
				...(invitedGuests !== selectedEvent?.invitedGuests && {
					invitedGuests,
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
				<DragHandleIcon />
				<div className='content-switch'>
					<h6>
						{!selectedEvent
							? 'Create'
							: selectedEvent && eventAuthor === currentUser
							? 'Manage'
							: 'RSVP'}
					</h6>
				</div>
				<IconBtn tooltip='Close' onClick={handleClose}>
					<CloseIcon />
				</IconBtn>
			</DialogTitle>
			<DialogContent>
				<FormControl
					variant='standard'
					sx={{ m: 1, minWidth: 120 }}
					size='small'
				>
					{user && (
						<>
							{!selectedEvent ||
							(selectedEvent && eventAuthor === currentUser) ? (
								<>
									<div className='event-section alt'>
										<InputLabel id='event-type'>Event Type</InputLabel>
										<Select
											labelId='event-type'
											value={eventType}
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
										{eventType === 'other' && (
											<TextField
												fullWidth
												sx={{ marginTop: '15px' }}
												label='Go on...'
												variant='standard'
												value={eventTypeInput}
												onChange={(e) => handleChange('other', e.target.value)}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<DetailsIcon className='icon' />
														</InputAdornment>
													),
												}}
											/>
										)}
									</div>
									<div className='event-section'>
										<CalendarMonthIcon className='icon space' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
											) : (
												<>{daySelected?.format('dddd, MMMM DD')}</>
											)}
										</h5>
									</div>
									<div className='event-section'>
										<TextField
											fullWidth
											label='Time'
											variant='standard'
											value={eventTime}
											onChange={(e) => handleChange('time', e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<ScheduleIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
										{errors && errors.time && (
											<h6 className='error'>{errors.time}</h6>
										)}
									</div>
									<div className='event-section'>
										<TextField
											fullWidth
											label='Location'
											variant='standard'
											value={eventLoc}
											onChange={(e) => handleChange('loc', e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<MyLocationIcon className='icon' />
													</InputAdornment>
												),
											}}
										/>
										{errors && errors.location && (
											<h6 className='error'>{errors.location}</h6>
										)}
									</div>
									<div className='event-section'>
										<BookmarkBorderIcon className='icon space' />
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
									<div className='event-section alt'>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<TextField
												label='Invite Guests'
												placeholder='Email Or Phone'
												variant='standard'
												value={invitedGuestInput}
												onChange={(e) => handleChange('guest', e.target.value)}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<PersonAddIcon className='icon' />
														</InputAdornment>
													),
												}}
												onFocus={() => dispatch(clearErrors())}
											/>
											<IconBtn
												tooltip='Add Guest'
												placement='top'
												disabled={!invitedGuestInput}
												onClick={handleAdd}
											>
												<AddBoxIcon className='add-icon' />
											</IconBtn>
										</div>
										{errors && errors.guest && (
											<h6 className='error'>{errors.guest}</h6>
										)}
										{invitedGuests.length > 0 && (
											<List
												style={{
													width: '100%',
													marginTop: '20px',
												}}
											>
												<ListItem
													disablePadding
													style={{ borderBottom: '1px solid steelblue' }}
												>
													<ListItemText secondary='Invited Guests' />
													{selectedEvent && eventAuthor === currentUser && (
														<IconBtn
															tooltip='Send Reminders'
															placement='top'
															onClick={handleReminders}
														>
															<SendToMobileIcon htmlColor='steelblue' />
														</IconBtn>
													)}
												</ListItem>
												{invitedGuests?.map((item) => (
													<ListItem
														disablePadding
														style={{
															borderBottom: '1px solid grey',
															marginTop: '10px',
														}}
														key={item}
													>
														<ListItemText primary={item} />
														{selectedEvent && eventAuthor === currentUser && (
															<IconBtn
																tooltip='Send Invite'
																placement='top'
																onClick={() => handleInvite(item)}
															>
																<SendToMobileIcon htmlColor='steelblue' />
															</IconBtn>
														)}
														<IconBtn
															tooltip='Delete Guest'
															placement='top'
															onClick={() => dispatch(removeInvitedGuest(item))}
														>
															<DeleteIcon htmlColor='red' />
														</IconBtn>
													</ListItem>
												))}
											</List>
										)}
									</div>
								</>
							) : (
								<>
									<div className='event-section'>
										<LocalActivityIcon className='icon space' />
										<h5>{selectedEvent?.type}</h5>
									</div>
									<div className='event-section'>
										<ScheduleIcon className='icon space' />
										<h5>
											{selectedEvent ? (
												<>{dayjs(selectedEvent.date).format('dddd, MMMM DD')}</>
											) : (
												<>{daySelected?.format('dddd, MMMM DD')}</>
											)}
										</h5>
									</div>
									<div className='event-section'>
										<MyLocationIcon className='icon space' />
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
															<GroupAddIcon className='icon' />
														</InputAdornment>
													),
												}}
											/>
											{errors?.headcount && (
												<h6 className='error'>{errors?.headcount}</h6>
											)}
										</>
									)}
								</>
							)}
						</>
					)}
					{!user && <DialogContentText>Sign in to RSVP!</DialogContentText>}
				</FormControl>
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
						<IconBtn tooltip='Undo' onClick={handleUndo}>
							<UndoIcon className='undo' />
						</IconBtn>
					)}
					{selectedEvent && !alreadyAttending && (
						<Button onClick={handleSubmit}>Submit</Button>
					)}
					{selectedEvent && eventAuthor === currentUser && (
						<IconBtn tooltip='Delete' placement='top' onClick={handleDelete}>
							<DeleteIcon className='delete' />
						</IconBtn>
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
