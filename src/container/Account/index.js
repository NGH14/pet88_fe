import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { Col, Divider, Row } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import SubNavBar from './../../components/SubNavBar/index';
import AppHeader from './../../components/Navbar/index';
import { Layout } from 'antd';
import './style.css';
import HeroImage from '../../components/HeroImageHomepage/index';
import FooterWave from './../../components/Footer/index';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
const { Header, Content, Footer } = Layout;
const Account = () => {
	const [loading, setLoading] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [file, setFile] = useState('');

	const { user, updateProfile } = UserAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const onFinish = async (e) => {
		setLoading(true);

		try {
			await updateProfile(user, {
				displayName,
			});

			setLoading(false);
		} catch (e) {
			console.log(e.message);
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Layout className='mainLayout accountLayout'>
			<Header>
				<SubNavBar></SubNavBar>
				<AppHeader></AppHeader>
			</Header>
			<Content>
				<HeroImage />
				<div className='account-page'>
					<div className='account-page_text'>
						<h1 className='account-page_title'>
							{t('account info')}
						</h1>
						<p>
							{t(
								'Fully update your information to work better on Pet88',
							)}
						</p>
					</div>
					<div className='form-account'>
						<Form
							name='update'
							labelCol={{
								span: 4,
							}}
							wrapperCol={{
								span: 14,
							}}
							size={'large'}
							initialValues={{
								username: user.displayName,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								label='Username'
								name='username'
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}>
								<Input />
							</Form.Item>
							<Form.Item
								label='Password'
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}>
								<Input.Password />
							</Form.Item>
							<Form.Item
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<Button type='primary' htmlType='submit'>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</Content>
		</Layout>
	);
};

export default Account;
