import {
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	InputAdornment,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	login,
	setAuthType,
	setFirstName,
	setLastName,
	setPhone,
	setEmail,
	setPassword,
	setNotify,
	setShow,
	clearErrors,
	clearForm,
} from '../../redux/slices/authSlice';
import { setMenuView } from '../../redux/slices/navSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TouchableOpacity from '../TouchableOpacity';
import TextInput from '../TextInput';
import Button from '../Button';

const Auth = () => {
	const {
		loading,
		authType,
		firstName,
		lastName,
		phone,
		email,
		password,
		notify,
		show,
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

			case 'phone':
				dispatch(setPhone(value));
				break;

			case 'email':
				dispatch(setEmail(value));
				break;

			case 'password':
				dispatch(setPassword(value));
				break;

			case 'notify':
				dispatch(setNotify(value));
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
				data.phone = phone;
				data.notify = notify;
				dispatch(register(data));
				break;

			default:
				break;
		}
	};

	return (
		<>
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
							<TextInput
								sx={{ '& input': { color: 'whitesmoke' } }}
								label='Mobile Number'
								size='small'
								margin='dense'
								value={phone}
								onChange={(e) => handleChange('phone', e.target.value)}
								onFocus={() => dispatch(clearErrors())}
							/>
							{errors && errors.phone && (
								<h6 className='error'>{errors.phone}</h6>
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
					{authType === 'Register' && (
						<div className='notify'>
							<FormLabel className='notify-label'>
								How do want to be notified?
							</FormLabel>
							<RadioGroup
								row
								value={notify}
								onChange={(e) => handleChange('notify', e.target.value)}
							>
								<FormControlLabel
									className='notify-label'
									value='sms'
									control={
										<Radio
											sx={{
												color: 'whitesmoke',
												'&.Mui-checked': { color: 'rgb(156, 39, 176)' },
											}}
										/>
									}
									label='Text'
								/>
								<FormControlLabel
									className='notify-label'
									value='email'
									control={
										<Radio
											sx={{
												color: 'whitesmoke',
												'&.Mui-checked': { color: 'rgb(156, 39, 176)' },
											}}
										/>
									}
									label='Email'
								/>
							</RadioGroup>
						</div>
					)}
					{errors && errors.notify && (
						<h6 className='error'>{errors.notify}</h6>
					)}
					{errors && errors.user && <h6 className='error'>{errors.user}</h6>}
					<Button type='submit' loading={loading} label='SUBMIT' />
				</FormControl>
			</form>
			{authType === 'Login' && (
				<h6 className='link' onClick={() => dispatch(setMenuView('forgot'))}>
					Forgot Password
				</h6>
			)}
		</>
	);
};

export default Auth;
