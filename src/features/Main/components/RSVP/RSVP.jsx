import React from 'react';
import Calendar from '../../../../components/Calendar';
import GuestList from '../../../../components/GuestList';
import './rsvp.scss';

const RSVP = () => {
	return (
		<div className='rsvp'>
			<Calendar />
			<GuestList />
		</div>
	);
};

export default RSVP;
