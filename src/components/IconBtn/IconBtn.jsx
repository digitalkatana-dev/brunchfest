import { IconButton, Tooltip } from '@mui/material';

const IconBtn = ({ tooltip, placement, disabled, onClick, children }) => {
	return (
		<Tooltip title={tooltip} placement={placement}>
			<IconButton disabled={disabled} onClick={onClick}>
				{children}
			</IconButton>
		</Tooltip>
	);
};

export default IconBtn;
