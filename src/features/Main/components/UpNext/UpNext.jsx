import { TypeAnimation } from 'react-type-animation';
import './upNext.scss';

const UpNext = () => {
	return (
		<div className='up-next'>
			<h2>
				Up Next:{' '}
				<TypeAnimation
					cursor={true}
					sequence={['May 28, 2023', 2000, 'Hamburger Maries', 2000]}
					wrapper='span'
					repeat={Infinity}
				/>
			</h2>
		</div>
	);
};

export default UpNext;
