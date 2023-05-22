import ActionBtn from './components/ActionBtn';
import SmallCalendar from './components/SmallCalendar';
import './sidebar.scss';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<ActionBtn label='RSVP' actionType='rsvp' />
			<SmallCalendar />
		</div>
	);
};

export default Sidebar;
