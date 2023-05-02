import React from 'react';
import Hero from './components/Hero';
import UpNext from './components/UpNext';
import RSVP from './components/RSVP';

const Main = () => {
	return (
		<div className='canvas'>
			<Hero />
			<UpNext />
			<RSVP />
		</div>
	);
};

export default Main;
