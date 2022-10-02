import React from 'react';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../Button';
import {
	ToastContainer,
	toast,
} from 'react-toastify';

export const Notification = ({
	message,
	autoCloseAfter,
	transition,
	newestOnTop,
	progressHide,
	theme,
	types,
	...props
}) => {
	const messageContent = message ? message : 'Message';

	const notify = () => {
		switch (types) {
			case 'error':
				toast.error(`${messageContent}`);
				break;
			case 'info':
				toast.info(`${messageContent}`);
				break;
			case 'warning':
				toast.warning(`${messageContent}`);
				break;
			case 'success':
				toast.success(`${messageContent}`);
				break;

			default:
				toast(`${messageContent}`);
		}
	};

	return (
		<>
			<Button onClick={notify} label={'Click here!'}>
				Notify!
			</Button>
			<ToastContainer
				onClick={(props) => console.log(props)}
				autoClose={autoCloseAfter}
				transition={transition}
				theme={theme}
				// position='top-right'
				hideProgressBar={progressHide}
				newestOnTop={newestOnTop}
				// closeOnClick={true}
				// rtl={false}
				// style={{ width: 'auto', minWidth: '20rem' }}
				// // pauseOnHover={true}
				// // pauseOnFocusLoss={false}
				// // draggable={true}
				// // draggablePercent={20}
				{...props}
			/>
		</>
	);
};



Notification.propTypes = {
	message: PropTypes.string,
	autoCloseAfter: PropTypes.number,
	newestOnTop: PropTypes.bool,
	progressHide: PropTypes.bool,
	types: PropTypes.oneOf(['error', 'info', 'warning','success', 'default']),
	theme: PropTypes.oneOf(['light', 'dark', 'colored']),
};

Notification.defaultProps = {
	message: 'This is message',
	autoCloseAfter: 5000,
	newestOnTop: false,
	progressHide: false,
	types: 'default',
	theme: 'colored',
};

