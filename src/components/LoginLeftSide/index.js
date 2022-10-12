import './style.css';

import React from 'react';

import LoginForm from '../LoginForm/';
import { Navigate, NavLink } from 'react-router-dom';

const LeftSideLogin = ({ src, returnUrl }) => {
	return (
		<>
			<div className='loginpage-leftside'>
				<NavLink to='/'>
					<img src={src} alt='' className='leftside_logo' />
				</NavLink>

				<LoginForm />
			</div>
		</>
	);
};

export default React.memo(LeftSideLogin);
