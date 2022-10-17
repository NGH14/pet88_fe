import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './style.css';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import MailBoxImg from '../../assets/svg/undraw_mailbox_re_dvds.svg';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [sendedEmail, setSendedEmail] = useState(false);

	const [email, setEmail] = useState('');
	const { forgotPassword } = UserAuth();

	const onFinish = async (e) => {
		setLoading(true);
		try {
			await forgotPassword(email);
			setSendedEmail(true);
			setLoading(false);
		} catch (e) {
			toast.error('Sorry, an error has occurred.');
			console.log(e.message);
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return sendedEmail ? (
		<motion.div
			className='forgotpassword'
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<img
				src={MailBoxImg}
				style={{ width: 100, margin: '10px auto' }}
				alt=''
			/>

			<h1 className='forgotpassword-heading'>Check Your Email!</h1>
			<span className='forgotpassword-subtext'>
				A Verification email has been sent to this email address: <br />{' '}
				<b>{email}</b>
				<br /> <br />
				If you haven't receieved the email within a few minutes, please
				check your spam folder.
			</span>

			<Button
				onClick={() => navigate('/sign-in')}
				type='primary'
				htmlType='submit'
				style={{
					fontWeight: 'bold',
					height: 'fit-content',
					width: '100%',
					fontSize: 15,
					backgroundColor: '#333',
					borderColor: '#333',
					borderRadius: 45,
					boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
				}}>
				Ok
			</Button>
		</motion.div>
	) : (
		<motion.div
			className='forgotpassword'
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<span className='forgotpassword-back'>
				<NavLink to='/sign-in'>
					<span style={{ fontSize: 16 }}>&#8592;</span> Back to
					Sign-in
				</NavLink>
			</span>
			<h1 className='forgotpassword-heading'>Forgot Your Password?</h1>
			<span className='forgotpassword-subtext'>
				Don't worry! please enter the email address associated with your
				account.
			</span>

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
							<MailOutlined className='site-form-item-icon' />
						}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						loading={loading}
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
