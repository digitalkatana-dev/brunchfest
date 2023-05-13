import { useSelector } from 'react-redux';
import './guestList.scss';

const GuestList = () => {
	const { selectedEvent } = useSelector((state) => state.calendar);

	return (
		<div className='guest-list'>
			<header>
				<h3>Guest Book</h3>
			</header>
			<div className='container'>
				<img src='guest-book.png' alt='' />
				<div className='overlay'>
					{selectedEvent?.attendees.map((guest) => (
						<span key={guest._id}>
							{guest.name} + {guest.headcount} guests
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default GuestList;
