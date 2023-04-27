import { CircularProgress } from '@mui/material';
import './touchable.scss';

const TouchableOpacity = ({ loading, onClick, children }) => {
	return (
		<button className='pressable' onClick={onClick}>
			{loading ? <CircularProgress /> : children}
		</button>
	);
};

export default TouchableOpacity;
