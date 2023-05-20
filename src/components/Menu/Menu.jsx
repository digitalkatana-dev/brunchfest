import { Paper } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import Auth from '../Auth';
import Forgot from '../Forgot';
import './menu.scss';

const Menu = () => {
	const { menuOpen, menuView } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(setMenuOpen(false));
		}
	}, [user]);

	return (
		<Paper className={menuOpen ? 'menu active' : 'menu'}>
			{menuView === 'forgot' ? <Forgot /> : <Auth />}
		</Paper>
	);
};

export default Menu;
