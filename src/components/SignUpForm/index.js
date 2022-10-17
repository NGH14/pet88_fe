import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { UserAuth } from '../../context/AuthContext';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
	const [email, setEmail] = React.useState('');
	const [emailStatus, setEmailStatus] = React.useState();
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const { createUser } = UserAuth();
	const navigate = useNavigate();
	console.log(emailStatus);

	const handleEmail = (e) => {
		setEmail(e);
		setEmailStatus();
	};
	const onFinish = async (e) => {
		setLoading(true);
		try {
			await createUser(email, password);
			navigate('/account');
			setLoading(false);
		} catch (e) {
			toast.error('The email already in use');
			setEmailStatus('error');
			console.log(e.message);
			setLoading(false);
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
			transition={{ duration: 0.5 }}>
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
				validateTrigger='onBlur'
				autoComplete='off'>
				<Form.Item
					validateStatus={emailStatus}
					name='username'
					rules={[
						{
							required: true,
							message: 'Please enter your email!',
						},
						{
							type: 'email',
							message: 'Invalid enter your email!',
						},
					]}
					help={emailStatus && 'Email is already used'}>
					<Input
						onChange={(e) => handleEmail(e.target.value)}
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
						{
							min: 6,
							message: 'Password must be minimum 6 characters.',
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
				<Form.Item
					name='agreement'
					valuePropName='checked'
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(
											new Error(
												'Should accept agreement',
											),
									  ),
						},
					]}>
					<Checkbox>
						I have read and agreed to the{' '}
						<a href=''>terms and conditions</a>
					</Checkbox>
				</Form.Item>
				<br />
				<Form.Item>
					<Button
						loading={loading}
						className='signupform-submit'
						disabled={emailStatus}
						type='primary'
						htmlType='submit'>
						Sign Up
					</Button>
				</Form.Item>
			</Form>

			<span className='signupform-subtext_bottom'>
				Already a Pet88 member?
				<NavLink to='/sign-in'> Sign in</NavLink>
			</span>
		</motion.div>
	);
};

export default SignUpForm;
