import { Button } from 'antd';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { ArrowRightOutlined } from '@ant-design/icons';

import './style.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SignUpButton = styled.p`
	font-family: 'Nunito Sans', sans-serif;
	border-radius: 40px;
	background-color: rgb(249 107 24);
	padding: 12px 24px;
	text-align: center;
	color: white;
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: -0.01em;
	border: none;
	margin-bottom: 0;
`;

const SignInButton = styled.a`.
font-family: 'Nunito Sans', sans-serif;
font-weight: 700;
margin-bottom: 0;
&:hover,
&:focus {
  color: red;
}

`;

function AuthButton({ TextColor }) {
	console.log(TextColor);
	const { user, SignOut } = UserAuth();
	const [t] = useTranslation();

	const handleSignOut = async () => {
		try {
			await SignOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='authbutton'>
			<h1 className='authbutton-text'>
				{user?.displayName && `hi ${user?.displayName}`}
			</h1>
			{user ? (
				<button onClick={handleSignOut}>Logout</button>
			) : (
				<>
					<NavLink to='/sign-in'>
						<SignInButton
							style={{
								transition: 'color 0.5s ease-in-out',
								color: TextColor,
								fontFamily: 'Nunito Sans',
							}}>
							{t('Sign in')}
						</SignInButton>
					</NavLink>
					<NavLink to='/sign-up'>
						<SignUpButton>
							{t('Sign up')} &nbsp;
							<ArrowRightOutlined />
						</SignUpButton>
					</NavLink>
				</>
			)}
		</div>
	);
}

export default AuthButton;
