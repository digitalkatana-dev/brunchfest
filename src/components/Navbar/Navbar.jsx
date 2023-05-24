import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Tooltip,
	useScrollTrigger,
} from '@mui/material';
import { cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/slices/authSlice';
import { setMenuOpen, setMenuView } from '../../redux/slices/navSlice';
import { logout } from '../../redux/slices/authSlice';
import { persistor } from '../../redux/rootStore';
import SettingsIcon from '@mui/icons-material/Settings';
import './navbar.scss';

const Navbar = (props) => {
	const { menuOpen } = useSelector((state) => state.nav);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const ElevationScroll = (props) => {
		const { children } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});
		return cloneElement(children, {
			elevation: trigger ? 4 : 0,
		});
	};

	const handleMenu = () => {
		dispatch(setMenuOpen(!menuOpen));
		setTimeout(() => {
			dispatch(clearErrors());
			dispatch(setMenuView('auth'));
		}, 1000);
	};

	const handleLogout = () => {
		dispatch(logout());
		persistor.purge();
	};

	return (
		<ElevationScroll {...props}>
			<AppBar>
				<Toolbar className={menuOpen ? 'navbar active' : 'navbar'}>
					{user ? (
						<div className='user-area'>
							<h3>Hello, {user.firstName}!</h3>
							<Tooltip title='Settings' placement='right'>
								<IconButton>
									<SettingsIcon className='settings-icon' />
								</IconButton>
							</Tooltip>
						</div>
					) : (
						<div></div>
					)}
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
		</ElevationScroll>
	);
};

export default Navbar;
