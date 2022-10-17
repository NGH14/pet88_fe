import React, { useEffect } from 'react';
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
import SignInGoogle from '../SigninGoogle/index';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { textAlign } from '@mui/system';

import completedImg from '../../assets/svg/undraw_complete_design_re_h75h.svg';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = ({ state }) => {
	const [counter, setCounter] = React.useState(15);
	const [runCounter, setRunCounter] = React.useState(false);
	const [success, setSuccess] = React.useState(true);

	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { ConfirmResetPassword } = UserAuth();
	const query = useQuery();

	const oobCode = query.get('oobCode');

	const update = () => {
		setCounter(counter - 1);
	};

	useEffect(() => {
		if (runCounter) {
			const interval = setInterval(() => {
				if (counter > 0) {
					update();
				}
				if (counter == 0) {
					setRunCounter(true);

					navigate('/sign-in', { replace: true });
				}
				clearInterval(interval);
			}, 1000);
		}
	});

	const onFinish = async (e) => {
		try {
			await ConfirmResetPassword(oobCode, password);
			// setRunCounter(true);
			setSuccess(true);
		} catch (e) {
			console.log(e.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return success ? (
		<div className='resetpasswordform'>
			<h1 className='resetpasswordform-heading'>Create New Password!</h1>
			<span className='resetpasswordform-subtext'>
				Your new password should be different from others app &#128274;
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
						RESET PASSWORD
					</Button>
				</Form.Item>
			</Form>
		</div>
	) : (
		<div className='resetpasswordform' style={{ textAlign: 'center' }}>
			<img
				src={completedImg}
				alt=''
				style={{ width: 180, margin: '10px auto' }}
			/>
			<h1 className='resetpasswordform-heading'>Password Updated</h1>
			<span className='resetpasswordform-subtext'>
				You have successfully reset the password <br />
				You will be redirect to the sign-in page in {counter} seconds
			</span>
			<Button
				onClick={() => navigate('/sign-in')}
				type='primary'
				htmlType='submit'
				style={{
					fontWeight: 'bold',
					fontSize: 14,
					lineHeight: 1.8,
					backgroundColor: 'RGB(109, 156, 145)',
					borderColor: 'RGB(109, 156, 145)',
					borderRadius: 50,
					boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
					marginBottom: 10,
				}}>
				BACK TO SIGN IN
			</Button>
		</div>
	);
};

export default ResetPasswordForm;
