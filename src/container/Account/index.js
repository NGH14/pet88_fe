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
import { Radio, Space, Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { async } from '@firebase/util';

const { Header, Content, Footer } = Layout;

const Account = () => {
	const [loading, setLoading] = useState('');
	const [file, setFile] = useState('');
	const { user, updateProfile, updateUser, UpdatePassword } = UserAuth();
	const [name, setName] = React.useState(user?.name);
	const [password, setPassword] = React.useState();

	const [oldPassword, setOldPassword] = React.useState();

	const { t } = useTranslation();
	const onFinish = async (e) => {
		setLoading(true);
		try {
			await updateUser(user?.id, name);
			setLoading(false);
		} catch (e) {
			console.log(e.message);
			setLoading(false);
		}
	};

	const onFinishPassword = async (e) => {
		setLoading(true);
		try {
			await UpdatePassword(oldPassword, password);
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
						<Tabs tabPosition='top'>
							<TabPane tab={t('Profile')} key='1'>
								<h1 className='account-page_title'>
									{t('account info')}
								</h1>
								<p>
									{t(
										'Fully update your information to work better on Pet88',
									)}
								</p>
								<Form
									name='update'
									size={'large'}
									initialValues={{
										username:
											user?.name ||
											localStorage.getItem('name'),
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
												message:
													'Please input your username!',
											},
										]}>
										<Input
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
									</Form.Item>
									<Form.Item label='email' name='email'>
										<Input.Password disabled />
									</Form.Item>
									<Form.Item
										wrapperCol={{
											offset: 8,
											span: 16,
										}}>
										<Button
											type='primary'
											htmlType='submit'>
											Submit
										</Button>
									</Form.Item>
								</Form>{' '}
							</TabPane>
							<TabPane tab={t('Change password')} key='2'>
								<Form
									name='update password'
									size={'large'}
									initialValues={{}}
									onFinish={onFinishPassword}
									onFinishFailed={onFinishFailed}
									autoComplete='off'>
									<Form.Item
										label='password'
										name='password'
										rules={[
											{
												required: true,
												message:
													'Please input your password!',
											},
										]}>
										<Input
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
									</Form.Item>
									<Form.Item
										label='oldpassword'
										name='oldpassword'
										type='password'
										rules={[
											{
												required: true,
												message:
													'Please input your password!',
											},
										]}>
										<Input
											onChange={(e) =>
												setOldPassword(e.target.value)
											}
										/>
									</Form.Item>
									<Form.Item label='email' name='email'>
										<Input.Password disabled />
									</Form.Item>
									<Form.Item
										wrapperCol={{
											offset: 8,
											span: 16,
										}}>
										<Button
											type='primary'
											htmlType='submit'>
											Submit
										</Button>
									</Form.Item>
								</Form>{' '}
							</TabPane>
							<TabPane tab={t('History')} key='3'>
								3rd TAB PANE Content
							</TabPane>
						</Tabs>
					</div>
				</div>
			</Content>
		</Layout>
	);
};

export default Account;
