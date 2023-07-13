import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import './upNext.scss';

const UpNext = () => {
	dayjs.extend(isSameOrAfter);
	const { savedEvents } = useSelector((state) => state.calendar);
	const [currentEvents, setCurrentEvents] = useState(null);

	useEffect(() => {
		if (savedEvents) {
			setCurrentEvents(
				savedEvents?.filter((item) =>
					dayjs(item?.date).isSameOrAfter(new Date(), 'day')
				)
			);
		}
	}, [savedEvents]);

	return (
		<div className='up-next'>
			<h2>
				Up Next:{' '}
				{currentEvents ? (
					<TypeAnimation
						cursor={true}
						sequence={[
							dayjs(currentEvents[0].date).format('MMM DD, YYYY'),
							2000,
							`${currentEvents[0].type} @`,
							2000,
							currentEvents[0].location,
							2000,
						]}
						wrapper='span'
						repeat={Infinity}
					/>
				) : (
					'TBD'
				)}
			</h2>
		</div>
	);
};

export default UpNext;
