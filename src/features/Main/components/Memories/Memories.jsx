import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../../../../components/Carousel';
import './memories.scss';

const Memories = () => {
	const { savedEvents } = useSelector((state) => state.calendar);
	const [memories, setMemories] = useState(null);

	useEffect(() => {
		const test = [];
		savedEvents?.forEach((item) => {
			if (item.pics.length > 0) {
				test.push({
					eventId: item._id,
					date: item.date,
					location: item.location,
					pics: item.pics,
				});
			}
		});

		setMemories(test.length > 0 ? test : null);
	}, [savedEvents]);

	return (
		<div className='memories'>
			<h3>Memories</h3>
			<div className={memories ? 'memory-container' : 'memory-container empty'}>
				{memories ? (
					<Carousel />
				) : (
					<h2>No memories yet, would you like to share?</h2>
				)}
			</div>
		</div>
	);
};

export default Memories;
