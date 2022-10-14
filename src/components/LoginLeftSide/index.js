import './style.css';

import React from 'react';

import LoginForm from '../LoginForm';
import { NavLink } from 'react-router-dom';

const LeftSideLogin = ({ src, returnUrl }) => {
	return (
		<>
			<div className='loginpage-leftside'>
				<NavLink to='/'>
					<img src={src} alt='' className='leftside_logo' />
				</NavLink>
				<LoginForm />
				<p>Copyright © 2022 MoeGo All rights reserved.</p>
			</div>
		</>
	);
};

export default React.memo(LeftSideLogin);
