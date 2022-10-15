import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SignInGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

const UpdatePasswordForm = () => {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { UpdatePassword } = UserAuth();

	const onFinish = async (e) => {
		try {
			await UpdatePassword(password);
		} catch (e) {
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
			transition={{ duration: 0.5 }}>
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
					onChange={(e) => setPassword(e.target.value)}
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
					/>
				</Form.Item>
				<Form.Item
					name='confirm'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										'The two passwords that you entered do not match!',
									),
								);
							},
						}),
					]}>
					<Input.Password
						placeholder='Confirm Password'
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
					/>
				</Form.Item>

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
						Reset Password
					</Button>
				</Form.Item>
			</Form>

			<span className='loginform-subtext_bottom'>
				Not a Pet88 member?{' '}
				<NavLink to='/signup'>Sign up for free</NavLink>
			</span>
		</motion.div>
	);
};

export default UpdatePasswordForm;
