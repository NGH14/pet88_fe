import './style.css';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from '../SignInForm';
import { Navigate, NavLink } from 'react-router-dom';
import SignUpForm from '../SignUpForm';

const LeftSideSignin = ({ src, returnUrl }) => {
	const [signIn, SetSignIn] = React.useState(true);
	console.log(signIn);
	return (
		<>
			<div className='loginpage-leftside'>
				<NavLink to='/'>
					<img src={src} alt='' className='leftside_logo' />
				</NavLink>

				{signIn ? (
					<LoginForm SetSignIn={SetSignIn} />
				) : (
					<SignUpForm SetSignIn={SetSignIn} />
				)}
			</div>
		</>
	);
};

export default React.memo(LeftSideSignin);
