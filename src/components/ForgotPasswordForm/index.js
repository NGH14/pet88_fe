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
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [t, i18n] = useTranslation();

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
			toast.error(t('Sorry, an error has occurred'));
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

			<h1 className='forgotpassword-heading'>{t('Check Your Email')}!</h1>
			<span className='forgotpassword-subtext'>
				{t('A Verification email has been sent to this email address')}:{' '}
				<br /> <b>{email}</b>
				<br /> <br />
				{t(
					'If you have not received the email within a few minutes, please check your spam folder',
				)}
				.
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
				{t('Ok')}
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
					<span style={{ fontSize: 16 }}>&#8592;</span>{' '}
					{t('Back to Sign-in')}
				</NavLink>
			</span>
			<h1 className='forgotpassword-heading'>
				{t('Forgot Your Password')}?
			</h1>
			<span className='forgotpassword-subtext'>
				{t(
					'Do not worry! please enter the email address associated with your account',
				)}
				.
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
							message: t('The input is not valid E-mail!'),
						},
						{
							required: true,
							message: t('Please input your E-mail!'),
						},
					]}>
					<Input
						placeholder={t('Email')}
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
						{t('Send')}
					</Button>
				</Form.Item>
			</Form>
		</motion.div>
	);
};

export default ForgotPasswordForm;
