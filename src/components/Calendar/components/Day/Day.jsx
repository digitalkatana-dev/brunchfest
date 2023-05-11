import './day.scss';

const Day = ({ day }) => {
	return <div>{day.format('MM/DD/YY')}</div>;
};

export default Day;
