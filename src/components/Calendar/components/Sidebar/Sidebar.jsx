import { useSelector } from 'react-redux';
import ActionBtn from './components/ActionBtn';
import SmallCalendar from './components/SmallCalendar';
import './sidebar.scss';

const Sidebar = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className='sidebar'>
			<ActionBtn label='RSVP' actionType='rsvp' />
			{user?.isAdmin && <ActionBtn label='Create' actionType='create' />}
			<SmallCalendar />
		</div>
	);
};

export default Sidebar;
