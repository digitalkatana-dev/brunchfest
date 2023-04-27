import { Paper, FormControl, IconButton, InputAdornment } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	login,
	setAuthType,
	setFirstName,
	setLastName,
	setEmail,
	setPassword,
	setShow,
	clearErrors,
	clearForm,
} from '../../redux/slices/authSlice';
import { setMenuOpen } from '../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TouchableOpacity from '../TouchableOpacity';
import TextInput from '../TextInput';
import Button from '../Button';
import './menu.scss';

const Menu = () => {
	const { menuOpen } = useSelector((state) => state.nav);
	const {
		loading,
		authType,
		firstName,
		lastName,
		email,
		password,
		show,
		user,
		errors,
	} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleChange = (input, value) => {
		switch (input) {
			case 'toggle':
				dispatch(clearErrors());
				dispatch(clearForm());
				dispatch(setAuthType(value));
				break;

			case 'first':
				dispatch(setFirstName(value));
				break;

			case 'last':
				dispatch(setLastName(value));
				break;

			case 'email':
				dispatch(setEmail(value));
				break;

			case 'password':
				dispatch(setPassword(value));
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email.toLowerCase(),
			password,
		};

		switch (authType) {
			case 'Login':
				dispatch(login(data));
				break;

			case 'Register':
				data.firstName = firstName;
				data.lastName = lastName;
				dispatch(register(data));
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		if (user) {
			dispatch(setMenuOpen());
		}
	}, [dispatch, user]);

	return (
		<Paper className={menuOpen ? 'menu active' : 'menu'}>
			<TouchableOpacity
				onClick={() =>
					handleChange('toggle', authType === 'Login' ? 'Register' : 'Login')
				}
			>
				<h2 className='txt'>{authType}</h2>
				{authType === 'Register' ? (
					<PersonAddIcon className='title-icon green' fontSize='large' />
				) : (
					<LoginIcon className='title-icon green' fontSize='large' />
				)}
			</TouchableOpacity>
			<form onSubmit={handleSubmit}>
				<FormControl variant='standard'>
					{authType === 'Register' && (
						<>
							<TextInput
								sx={{
									'& input': {
										color: 'whitesmoke',
									},
								}}
								label='First Name'
								size='small'
								margin='dense'
								value={firstName}
								onChange={(e) => handleChange('first', e.target.value)}
								onFocus={() => dispatch(clearErrors())}
							/>
							{errors && errors.firstName && (
								<h6 className='error'>{errors.firstName}</h6>
							)}
							<TextInput
								sx={{
									'& input': {
										color: 'whitesmoke',
									},
								}}
								label='Last Name'
								size='small'
								margin='dense'
								value={lastName}
								onChange={(e) => handleChange('last', e.target.value)}
								onFocus={() => dispatch(clearErrors())}
							/>
							{errors && errors.lastName && (
								<h6 className='error'>{errors.lastName}</h6>
							)}
						</>
					)}
					<TextInput
						sx={{
							'& input': {
								color: 'whitesmoke',
							},
						}}
						label='Email'
						size='small'
						margin='dense'
						value={email}
						onChange={(e) => handleChange('email', e.target.value)}
						onFocus={() => dispatch(clearErrors())}
					/>
					{errors && errors.email && <h6 className='error'>{errors.email}</h6>}
					<TextInput
						sx={{
							'& input': {
								color: 'whitesmoke',
							},
						}}
						type={show ? 'text' : 'password'}
						label='Password'
						size='small'
						margin='dense'
						value={password}
						onChange={(e) => handleChange('password', e.target.value)}
						onFocus={() => dispatch(clearErrors())}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => dispatch(setShow())}
										onMouseDown={(e) => e.preventDefault()}
										edge='end'
									>
										{show ? (
											<VisibilityOff className='visibility-icon' />
										) : (
											<Visibility className='visibility-icon' />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{errors && errors.password && (
						<h6 className='error'>{errors.password}</h6>
					)}
					<Button type='submit' loading={loading} label='SUBMIT' />
				</FormControl>
			</form>
		</Paper>
	);
};

export default Menu;
