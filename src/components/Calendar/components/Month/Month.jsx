import React from 'react';
import Day from '../Day';
import './month.scss';

const Month = ({ month }) => {
	return (
		<div className='flex-1 grid grid-cols-7 grid-rows-5'>
			{month.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((day, idx) => (
						<Day key={idx} day={day} />
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default Month;
