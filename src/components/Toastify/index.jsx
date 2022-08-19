import React from 'react';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import { Button } from './../Button/Button';
import {
	ToastContainer,
	toast,
	Bounce,
	Zoom,
	Flip,
	Slide,
} from 'react-toastify';

export const Toastify = ({
	message,
	autoCloseAfter = 5000,
	transition = Bounce,
	newestOnTop = false,
	theme = 'light',
	progressHide = false,
	types,
	...props
}) => {
	const messageContent = message ? message : 'Message';
	console.log(messageContent);
	// const notify = () => toast(`${messageContent}`);
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

Toastify.propTypes = {
	message: PropTypes.string,
	autoCloseAfter: PropTypes.number,
	newestOnTop: PropTypes.bool,
	progressHide: PropTypes.bool,
	types: PropTypes.oneOf(['error', 'info', 'warning','success', "default"]),
	theme: PropTypes.oneOf(['light', 'dark', 'colored']),
};

Toastify.defaultProps = {
	message: 'This is message',
	autoCloseAfter: 5000,
	newestOnTop: false,
	theme: 'light',
	progressHide: false,
	types: "default",
};

