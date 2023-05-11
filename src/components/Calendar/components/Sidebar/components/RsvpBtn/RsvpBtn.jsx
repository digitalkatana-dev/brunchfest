import React from 'react';
import './rsvpbtn.scss';

const RsvpBtn = () => {
	return (
		<button className='rsvp-btn'>
			<img src='plus.svg' alt='' className='rsvp-btn-icon' />
			<span>RSVP</span>
		</button>
	);
};

export default RsvpBtn;
