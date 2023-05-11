import RsvpBtn from './components/RsvpBtn';
import SmallCalendar from './components/SmallCalendar';
import './sidebar.scss';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<RsvpBtn />
			<SmallCalendar />
		</div>
	);
};

export default Sidebar;
