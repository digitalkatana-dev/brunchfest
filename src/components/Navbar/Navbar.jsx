import { AppBar, Toolbar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../redux/slices/navSlice';
import { logout } from '../../redux/slices/authSlice';
import { persistor } from '../../redux/rootStore';
import './navbar.scss';

const Navbar = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleMenu = () => {
		dispatch(setMenuOpen());
	};

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	return (
		<AppBar position='static'>
			<Toolbar className={menuOpen ? 'navbar active' : 'navbar'}>
				{user ? <h4>Hello, {user.firstName}!</h4> : <div></div>}
				{user ? (
					<Button color='inherit' onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<div className='hamburger' onClick={handleMenu}>
						<span className='line1'></span>
						<span className='line2'></span>
						<span className='line3'></span>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
