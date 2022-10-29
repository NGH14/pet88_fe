import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SigninGoogle';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const SignInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [emailSignInloadings, setEmailSignInloadings] = useState(false);
	const [t] = useTranslation();
	const { emailSignIn } = UserAuth();

	const navigate = useNavigate();

	const onFinish = async (e) => {
		setEmailSignInloadings(true);

		try {
			await emailSignIn(email, password);

			setEmailSignInloadings(false);
			navigate('/', { replace: true });
		} catch (e) {
			toast.error(t('Invalid email or password'));
			console.log(e.message);
			setEmailSignInloadings(false);
		}
	};

	useEffect(() => {
		document.title = `${t('Sign in')} | Pet88`;
	});

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<motion.div
			className='loginform'
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<h1 className='loginform-heading'>{t('Welcome Back')}!</h1>
			<span className='loginform-subtext'>
				{t("It's great to have you back in Pet88")} 🥰
			</span>
			<SignInGoogle
				label={t('Sign in with Google')}
				style={{
					width: '100%',
					backgroundColor: '#fff',
					color: '#000',
					borderRadius: 5,
					fontSize: 14,
				}}
			/>

			<div className='loginform-loginby'>
				<span className='textwithline'>{t('or')}</span>
			</div>

			<Form
				name='basic'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				validateTrigger='onBlur'
				autoComplete='on'>
				<Form.Item
					name='username'
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}>
					<Input
						placeholder='Email'
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					name={t('password')}
					rules={[
						{
							required: true,
							message: 'Please enter your password!',
						},
					]}>
					<Input.Password
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						placeholder={t('Password')}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Item>
				<NavLink
					className='loginform-forgotpassword'
					to='/forgot-password'>
					{t('Forgot Password')}?
				</NavLink>

				<Form.Item>
					<Button
						loading={emailSignInloadings}
						type='primary'
						htmlType='submit'
						style={{
							height: 'fit-content',
							width: '100%',
							fontSize: 16,
							lineHeight: 1.8,

							backgroundColor: '#000',
							borderColor: '#000',
							borderRadius: 5,
							boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
						}}>
						{t('Sign in')}
					</Button>
				</Form.Item>
			</Form>

			<span className='loginform-subtext_bottom'>
				{t('Not a Pet88 member?')}{' '}
				<NavLink to='/sign-up'>{t('Sign up for free')}</NavLink>
			</span>
		</motion.div>
	);
};

export default SignInForm;
