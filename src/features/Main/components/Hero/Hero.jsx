import React from 'react';
import './hero.scss';

const Hero = () => {
	return (
		<div className='hero'>
			<video src='brunch.mp4' muted autoPlay loop />
			<div className='hero-txt'>
				<h1>Let's Do Brunch!</h1>
			</div>
		</div>
	);
};

export default Hero;
