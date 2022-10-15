import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {
	NavLink,
	useNavigate,
	useLocation,
	useResolvedPath,
	redirect,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './style.css';
import SignInGoogle from '../SignInGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = ({}) => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { ConfirmResetPassword, user } = UserAuth();
	const query = useQuery();

	const oobCode = query.get('oobCode');

	if (!oobCode || user) {
		navigate('/');
	}

	const onFinish = async (e) => {
		try {
			await ConfirmResetPassword(oobCode, password);
			navigate('/sign-in');
		} catch (e) {
			console.log(e.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		loading && (
			<div className='resetpasswordform'>
				<h1 className='resetpasswordform-heading'>
					Reset Your Password!
				</h1>
				<span className='resetpasswordform-subtext'>
					It's great to have you back in Pet88 🥰
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
			</div>
		)
	);
};

export default ResetPasswordForm;
