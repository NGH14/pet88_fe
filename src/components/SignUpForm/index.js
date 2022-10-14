import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { UserAuth } from '../../context/AuthContext';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = ({ SetSignIn }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { createUser } = UserAuth();
	const navigate = useNavigate();

	const onFinish = async (e) => {
		try {
			await createUser(email, password);
			navigate('/account');
		} catch (e) {
			console.log(e.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<motion.div
			className='signupform'
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -100, opacity: 0 }}
			transition={{ duration: 1 }}>
			<h1 className='signupform-heading'>Welcome! </h1>
			<span className='signupform-subtext'>
				Xin chào, It's great to have you join in Pet88 🥰
			</span>

			<Form
				name='basic'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: 'Please enter your email!',
						},
					]}>
					<Input
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
					/>
				</Form.Item>
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
						Sign Up
					</Button>
				</Form.Item>
			</Form>

			<span className='loginform-subtext_bottom'>
				Already a Pet88 member?
				<a onClick={() => SetSignIn(true)}> Sign in</a>
			</span>
		</motion.div>
	);
};

export default SignUpForm;
