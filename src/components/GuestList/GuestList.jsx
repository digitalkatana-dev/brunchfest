import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGuestList } from '../../redux/slices/calendarSlice';
import './guestList.scss';

const GuestList = () => {
	const { selectedEvent, guestList } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	useEffect(() => {
		if (selectedEvent) {
			dispatch(setGuestList(selectedEvent?.attendees));
		}
	}, [selectedEvent]);

	return (
		<div className='guest-list'>
			<header>
				<h3>Guest Book</h3>
			</header>
			<div className='container'>
				<img src='guest-book.png' alt='' />
				<div className='overlay'>
					{guestList?.map((guest) => (
						<span key={guest._id}>
							{guest.name} + {guest.headcount - 1} guests
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default GuestList;
