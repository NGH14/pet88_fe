import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import {
	Button,
	Checkbox,
	Form,
	Input,
	Divider,
	Empty,
	Select,
	DatePicker,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';

import { useNavigate } from 'react-router-dom';
import SubNavBar from './../../components/SubNavBar/index';
import AppHeader from './../../components/Navbar/index';
import { Layout, ConfigProvider } from 'antd';
import './style.css';
import HeroImage from '../../components/HeroImageHomepage/index';
import FooterWave from './../../components/Footer/index';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';
import UploadAvatarUser from '../../components/UploadAvatarUser';
import { UserLanguage } from '../../context/LanguageContext';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const Account = () => {
	const [loading, setLoading] = useState('');
	const [passwordLoading, setPasswordLoading] = useState(false);
	const { lang, SetLanguage } = UserLanguage();

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
		setPasswordLoading(true);
		try {
			await UpdatePassword(oldPassword, password);
			setPasswordLoading(false);
			toast.success('Update Password Success');
		} catch (e) {
			toast.error('Current password is incorrect');
			console.log(e.message);
			setPasswordLoading(false);
		}
	};

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select
				style={{
					width: 80,
				}}>
				<Option value='84'>+84</Option>
				<Option value='87'>+87</Option>
			</Select>
		</Form.Item>
	);

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
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
									<h1 className='form-title'>
										{t('account info')}
									</h1>
									<p>
										{t(
											'Fully update your information to work better on Pet88',
										)}
									</p>
									<UploadAvatarUser></UploadAvatarUser>
									<Form
										labelCol={{ span: 4 }}
										name='update profire'
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
										<Form.Item label='DatePicker'>
											<DatePicker format={'DD-MM-YYYY'} />
										</Form.Item>
										<Form.Item
											name='phone'
											label='Phone Number'
											rules={[
												{
													required: true,
													message:
														'Please input your phone number!',
												},
											]}>
											<Input
												addonBefore={prefixSelector}
												style={{
													width: '100%',
												}}
											/>
										</Form.Item>

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
										<Form.Item>
											<Button
												type='primary'
												htmlType='submit'>
												Submit
											</Button>
										</Form.Item>
									</Form>{' '}
								</TabPane>
								<TabPane tab={t('Change password')} key='2'>
									<div className='account-tabpane account-tab_formcontain '>
										<div className='tabpane_formtext '>
											<h2 className='form-title'>
												{t('Change Password')}
											</h2>
											<p>
												{t(
													'For the security, do not share your password with anyone else',
												)}
											</p>
											<Divider></Divider>
										</div>

										<Form
											className='form_user-account'
											labelCol={{ span: 4 }}
											name='change password'
											initialValues={{}}
											onFinish={onFinishPassword}
											onFinishFailed={onFinishFailed}
											requiredMark={false}
											autoComplete='off'>
											<Form.Item
												onChange={(e) =>
													setOldPassword(
														e.target.value,
													)
												}
												label={t('current password')}
												name='old-password'
												rules={[
													{
														required: true,
														message:
															'Please enter your password!',
													},
												]}>
												<Input.Password />
											</Form.Item>
											<Form.Item
												label={t('new password')}
												onChange={(e) =>
													setPassword(e.target.value)
												}
												name='password'
												rules={[
													{
														required: true,
														message:
															'Please enter your password!',
													},
													{
														min: 6,
														message:
															'Password must be minimum 6 characters.',
													},
												]}>
												<Input.Password />
											</Form.Item>
											<Form.Item
												label={t('confirm password')}
												name='confirm'
												dependencies={['password']}
												hasFeedback
												rules={[
													{
														required: true,
														message:
															'Please confirm your password!',
													},
													({ getFieldValue }) => ({
														validator(_, value) {
															if (
																!value ||
																getFieldValue(
																	'password',
																) === value
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
												<Input.Password />
											</Form.Item>
											<Form.Item
												wrapperCol={{
													offset: 8,
													span: 16,
												}}>
												<Button
													loading={passwordLoading}
													type='primary'
													htmlType='submit'>
													{t('Confirm')}
												</Button>
											</Form.Item>
										</Form>
									</div>
								</TabPane>
							</Tabs>
						</div>
						<div className='form-account'>
							<Tabs tabPosition='top'>
								<TabPane tab={t('History')} key='3'>
									<Empty className='account-tabpane empty-tab' />
								</TabPane>
							</Tabs>
						</div>
					</div>
				</Content>
			</Layout>
		</ConfigProvider>
	);
};

export default Account;
