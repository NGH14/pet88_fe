import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SignInGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const { forgotPassword } = UserAuth();

	const onFinish = async (e) => {
		try {
			await forgotPassword(email);
		} catch (e) {
			console.log(e.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<motion.div
			className='forgotpassword'
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<span className='forgotpassword-back'>
				<NavLink to='/sign-in'> &#8592; Back</NavLink>
			</span>
			<h1 className='forgotpassword-heading'>Forgot Your Password?</h1>
			<span className='forgotpassword-subtext'>
				Don't worry! please enter the email address associated with your
				account
			</span>

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
							<MailOutlined className='site-form-item-icon' />
						}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						style={{
							height: 'fit-content',
							width: '100%',
							fontSize: 15,
							backgroundColor: '#000',
							borderColor: '#000',
							borderRadius: 45,
							boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
						}}>
						Send
					</Button>
				</Form.Item>
			</Form>
		</motion.div>
	);
};

export default ForgotPasswordForm;
