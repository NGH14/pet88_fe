import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SignInGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

const LoginForm = ({ SetSignIn }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { emailSignIn } = UserAuth();

	const onFinish = async (e) => {
		try {
			await emailSignIn(email, password);
			navigate('/');
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<motion.div
			className='loginform'
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ duration: 1 }}>
			<h1 className='loginform-heading'>Welcome back!</h1>
			<span className='loginform-subtext'>
				It's great to have you back in Pet88 🥰
			</span>
			<SignInGoogle
				style={{
					width: '100%',
					backgroundColor: '#fff',
					color: '#000',
					borderRadius: 5,
				}}
			/>

			<div className='loginform-loginby'>
				<span className='textwithline'>or Sign in with Email</span>
			</div>

			<Form
				name='basic'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
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
				<br style={{ pointerEvents: 'none' }} />
				<Form.Item
					name='password'
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
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Item>
				<br />
				<Form.Item>
					<Button
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
						Sign in
					</Button>
				</Form.Item>
			</Form>

			<span className='loginform-subtext_bottom'>
				Not a Pet88 member?{' '}
				<a onClick={() => SetSignIn(false)}>Sign up for free</a>
			</span>
		</motion.div>
	);
};

export default LoginForm;
