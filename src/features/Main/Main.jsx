import React from 'react';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import UpNext from './components/UpNext';
import RSVP from './components/RSVP';
import Memories from './components/Memories';
import Footer from './components/Footer';

const Main = () => {
	return (
		<div className='canvas'>
			<Hero />
			<Welcome />
			<UpNext />
			<RSVP />
			<Memories />
			<Footer />
		</div>
	);
};

export default Main;
