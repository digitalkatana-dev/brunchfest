import { TypeAnimation } from 'react-type-animation';
import './hero.scss';

const Hero = () => {
	return (
		<div className='hero'>
			<video src='brunch.mp4' muted autoPlay loop />
			<div className='hero-txt'>
				<h1>
					Let's{' '}
					<TypeAnimation
						cursor={true}
						sequence={[
							'Do Brunch!',
							2000,
							'Go To The Movies!',
							2000,
							'Go Roller Skating!',
							2000,
							'Do Something!!',
							5000,
						]}
						wrapper='span'
						repeat={Infinity}
					/>
				</h1>
			</div>
		</div>
	);
};

export default Hero;
