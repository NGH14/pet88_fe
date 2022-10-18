import './style.css';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from '../SignInForm';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from '../SignUpForm';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { UserAuth } from '../../context/AuthContext';
import ChangeLanguage from './../ChangeLanguage/index';

const LeftSideSignin = ({ src }) => {
	const locate = useLocation();
	const { user } = UserAuth();
	return (
		<>
			<div className='loginpage-leftside'>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginInline: 10,
					}}>
					<NavLink to='/'>
						<img src={src} alt='' className='leftside_logo' />
					</NavLink>
					<ChangeLanguage />
				</div>
				{(() => {
					switch (locate.pathname) {
						case '/sign-in':
							return <LoginForm />;
						case '/sign-up':
							return <SignUpForm />;
						case '/forgot-password':
							return <ForgotPasswordForm />;
						default:
							return null;
					}
				})()}
			</div>
		</>
	);
};

export default React.memo(LeftSideSignin);
