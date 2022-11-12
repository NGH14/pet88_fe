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
	Popconfirm,
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
import { UserLanguage } from '../../context/LanguageContext';
import moment from 'moment';
import { Timestamp } from '@firebase/firestore';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const Account = () => {
	const [loading, setLoading] = useState(false);
	const [passwordLoading, setPasswordLoading] = useState(false);
	const { lang } = UserLanguage();
	const { user, updateProfile, updateUser, UpdatePassword, getOrderByUser } =
		UserAuth();
	const [name, setName] = React.useState(user?.name);
	const [password, setPassword] = React.useState();
	const [oldPassword, setOldPassword] = React.useState();
	const [dob, setdob] = React.useState(user?.dob);
	const [orderList, setOrderList] = React.useState([]);
	const [gender, setGender] = React.useState(user?.gender);
	const [phone, setPhone] = React.useState(user?.phone);
	const { t } = useTranslation();

	React.useEffect(() => {
		getOrder();
	}, []);

	const getOrder = async () => {
		const orders = await getOrderByUser(user.id, user.email);
		console.log(orders);
		setOrderList(orders);
	};

	const handleGenderChange = (value) => {
		setGender(value);
	};

	const onChangeDate = (date, dateString) => {
		const userDoB = Timestamp.fromDate(new Date(date));
		setdob(userDoB);
	};

	const onFinish = async (e) => {
		setLoading(true);
		try {
			await updateUser(user?.id, name, dob, gender, phone);
			setLoading(false);
			toast.success(t('Update Profile Success'));
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));

			console.log(e.message);
			setLoading(false);
		}
	};

	const onFinishPassword = async (e) => {
		setPasswordLoading(true);
		try {
			await UpdatePassword(oldPassword, password);
			setPasswordLoading(false);
			toast.success(t('Update Password Success'));
		} catch (e) {
			toast.error(t('Current password is incorrect'));
			console.log(e.message);
			setPasswordLoading(false);
		}
	};
	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select
				style={{
					width: 70,
					fontSize: 14,
				}}>
				<Option value='84'>+84</Option>
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
						<div className='form-account '>
							<Tabs tabPosition='top'>
								<TabPane tab={t('Profile')} key='1'>
									<div className='account-tab_formcontain '>
										<div className='tabpane_formtext'>
											<h2 className='form-title'>
												{t('my profile')}
											</h2>
											<p>
												{t(
													'Manage and protect your account',
												)}
											</p>
										</div>
										<Divider></Divider>
									</div>

									<div className='user-profile'>
										<Form
											validateTrigger='onBlur'
											labelCol={{ span: 4 }}
											name='update profire'
											size={'large'}
											initialValues={{
												name:
													user?.name ||
													localStorage.getItem(
														'name',
													),
												prefix: '84',
												phone: user?.phone,
												gender: user?.gender,
												dob: moment(user?.dob.toDate()),
												email: user?.email,
											}}
											onFinish={onFinish}
											onFinishFailed={onFinishFailed}
											autoComplete='off'
											requiredMark={false}>
											<Form.Item
												onChange={(e) =>
													setName(e.target.value)
												}
												label={t('Name')}
												name='name'
												rules={[
													{
														required: true,
														message: t(
															'Please input your username!',
														),
													},
												]}>
												<Input />
											</Form.Item>
											<Form.Item
												name='dob'
												label={t('Date of Birth')}>
												<DatePicker
													onChange={onChangeDate}
													disabledDate={(current) =>
														current > moment()
													}
													format={
														lang === 'vi'
															? 'DD-MM-YYYY'
															: null
													}
												/>
											</Form.Item>
											<Form.Item
												name='gender'
												label={t('Gender')}>
												<Select
													onChange={
														handleGenderChange
													}>
													<Option value='male'>
														{t('Male')}
													</Option>
													<Option value='female'>
														{t('Female')}
													</Option>
													<Option value='other'>
														{t('Other')}
													</Option>
												</Select>
											</Form.Item>
											<Form.Item
												onChange={(e) =>
													setPhone(e.target.value)
												}
												type='number'
												name='phone'
												label={t('Phone Number')}>
												<Input
													addonBefore={prefixSelector}
													style={{
														width: '100%',
													}}
												/>
											</Form.Item>
											<Form.Item
												label='Email'
												name='email'>
												<Input disabled />
											</Form.Item>
											<Form.Item
												wrapperCol={{
													offset: 4,
													span: 16,
												}}>
												<Button
													loading={loading}
													style={{
														height: 'fit-content',
														fontSize: 16,
														lineHeight: 1.8,
														borderRadius: 5,
														boxShadow:
															'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
													}}
													type='primary'
													htmlType='submit'>
													{t('Confirm')}
												</Button>
											</Form.Item>
										</Form>
									</div>
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
											validateTrigger='onBlur'
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
														message: t(
															'Please enter your password!',
														),
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
														message: t(
															t(
																'Please enter your password!',
															),
														),
													},
													{
														min: 6,
														message: t(
															'Password must be minimum 6 characters.',
														),
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
														message: t(
															'Please confirm your password!',
														),
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
																	t(
																		'The two passwords that you entered do not match!',
																	),
																),
															);
														},
													}),
												]}>
												<Input.Password />
											</Form.Item>
											<Form.Item
												wrapperCol={{
													offset: 4,
													span: 16,
												}}>
												<Button
													style={{
														height: 'fit-content',
														fontSize: 16,
														lineHeight: 1.8,

														borderRadius: 5,
														boxShadow:
															'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
													}}
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
									{orderList.length === 0 ? (
										<Empty className='account-tabpane empty-tab' />
									) : (
										orderList?.map((order) => {
											return <p>{order.email}</p>;
										})
									)}
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
