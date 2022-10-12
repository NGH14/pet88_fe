import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import './style.css';
import SignInGoogle from './../SigninGoogle/index';

const LoginForm = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className='loginform'>
			<h1 className='loginform-heading'> Welcome back! </h1>
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
						placeholder='Email'
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
					/>
				</Form.Item>
				<br />
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
				Not a Pet88 member? <NavLink to='/'>Sign up for free</NavLink>
			</span>
		</div>
	);
};

export default LoginForm;
