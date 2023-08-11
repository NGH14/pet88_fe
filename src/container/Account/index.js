import React, { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import {
	Button,
	Form,
	Input,
	Divider,
	Select,
	DatePicker,
	Table,
	Tabs,
	Tag,
	Modal,
	Tooltip,
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
import TabPane from 'antd/lib/tabs/TabPane';
import { toast } from 'react-toastify';
import { UserLanguage } from '../../context/LanguageContext';
import moment from 'moment';
import { Timestamp } from '@firebase/firestore';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const Account = () => {
	const [loading, setLoading] = useState(false);
	const [loadingOrder, setLoadingOrder] = useState(false);
	const navigate = useNavigate();
	const [passwordLoading, setPasswordLoading] = useState(false);
	const { lang } = UserLanguage();
	const {
		user,
		updateProfile,
		updateUser,
		UpdatePassword,
		getOrderByUser,
		forgotPassword,
	} = UserAuth();
	const [name, setName] = React.useState(user?.name);
	const [password, setPassword] = React.useState();
	const [oldPassword, setOldPassword] = React.useState();
	const [dob, setdob] = React.useState(user?.dob);
	const [orderList, setOrderList] = React.useState([]);
	const [gender, setGender] = React.useState(user?.gender);
	const [phone, setPhone] = React.useState(user?.phone);
	const { t } = useTranslation();
	const [openModalResetPassword, setOpenModalResetPassword] = useState(false);

	const [
		confirmLoadingModalResetPassword,
		setConfirmLoadingModalResetPassword,
	] = useState(false);

	const columns = [
		{
			title: 'Order ID',
			dataIndex: '_id',
			key: '_id',
			render: (text) => (
				<Tooltip placement='top' title={text} showArrow={false}>
					{text}
				</Tooltip>
			),
			ellipsis: true,
		},
		{
			title: t('Type'),
			dataIndex: 'service',
			key: 'service',
			render: (text) => <span>{text}</span>,
		},
		{
			title: 'Room Booking',
			dataIndex: 'products',
			key: 'products',
			render: (products) =>
				products?.length > 0 && Array.isArray(products)
					? products?.map((_) => <p>{_.roomNumber}</p>)
					: null,
		},
		{
			title: t('Drop off'),
			dataIndex: 'start',
			key: 'start',
			render: (text) => <span>{text?.slice(0, 10)}</span>,
		},
		{
			title: t('Pick up'),
			dataIndex: 'end',
			key: 'end',
			render: (text) => <span>{text?.slice(0, 10)}</span>,
		},
		{
			title: 'Date (Nights)',
			dataIndex: 'days',
			key: 'days',
			render: (text) => <span>{text > 0 ? text : null}</span>,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (text) => (
				<span>
					{new Intl.NumberFormat('vi-VI', {
						style: 'currency',
						currency: 'VND',
					}).format(text)}
				</span>
			),
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text) => <span>{text?.slice(0, 10)}</span>,
		},
		{
			title: 'Status',
			dataIndex: 'paid',
			key: 'paid',
			render: (text) => (
				<Tag color={text === 'success' ? 'green' : 'red'}>{text}</Tag>
			),
		},
		{
			title: 'Confirm',
			dataIndex: 'confirm',
			key: 'confirm',
			render: (text) => (
				<Tag color={text === 'confimred' ? 'green' : 'red'}>{text}</Tag>
			),
		},
	];

	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, [user]);

	useEffect(() => {
		getOrder();
	}, []);

	const SendResetPassword = async () => {
		setConfirmLoadingModalResetPassword(true);
		try {
			await forgotPassword(user?.email);
			toast.success(t('Password reset email has been sent'));

			setOpenModalResetPassword(false);
			setConfirmLoadingModalResetPassword(false);
		} catch (e) {
			toast.error(t('Sorry, an error has occurred'));
			console.log(e.message);
			setConfirmLoadingModalResetPassword(false);
			setOpenModalResetPassword(false);
		}
	};

	const getOrder = async () => {
		setLoadingOrder(true);
		try {
			const orders = await getOrderByUser();
			setOrderList(orders);
			setLoadingOrder(false);
		} catch (error) {
			console.log(error);
			setLoadingOrder(false);
		}
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
				}}
			>
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
						<Modal
							centered
							width={450}
							closable={false}
							footer={null}
							onCancel={() => setOpenModalResetPassword(false)}
							open={openModalResetPassword}
							confirmLoading={confirmLoadingModalResetPassword}
						>
							<div>
								<h6
									style={{
										fontWeight: 700,
										fontSize: 18,
										paddingBottom: 10,
									}}
								>
									{t('Reset Password')}
								</h6>
								<p style={{ fontWeight: 500, fontSize: 14 }}>
									{t('Send a password reset email to')}
								</p>

								<b>{user?.email}</b>

								<div
									style={{
										marginTop: 20,
										display: 'flex',
										gap: 5,
										justifyContent: 'flex-end',
									}}
								>
									<Button
										onClick={() =>
											setOpenModalResetPassword(false)
										}
										style={{ borderRadius: 8 }}
									>
										{t('Cancel')}
									</Button>
									<Button
										loading={
											confirmLoadingModalResetPassword
										}
										onClick={SendResetPassword}
										style={{ borderRadius: 8 }}
										type='primary'
									>
										{t('Send')}
									</Button>
								</div>
							</div>
						</Modal>
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
												dob: moment(
													user?.dob?.toDate(),
												),
												email: user?.email,
											}}
											onFinish={onFinish}
											onFinishFailed={onFinishFailed}
											autoComplete='off'
											requiredMark={false}
										>
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
												]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												name='dob'
												label={t('Date of Birth')}
											>
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
												label={t('Gender')}
											>
												<Select
													onChange={
														handleGenderChange
													}
												>
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
												label={t('Phone Number')}
											>
												<Input
													addonBefore={prefixSelector}
													style={{
														width: '100%',
													}}
												/>
											</Form.Item>
											<Form.Item
												label='Email'
												name='email'
											>
												<Input disabled />
											</Form.Item>
											<Form.Item
												style={{
													display: 'flex',
													justifyContent: 'flex-end',
												}}
											>
												<Button
													className='fullwidth-button'
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
													htmlType='submit'
												>
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
												<Button
													type='link'
													onClick={() =>
														setOpenModalResetPassword(
															true,
														)
													}
												>
													{' '}
													({t('Forgot Password')} )
												</Button>
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
											autoComplete='off'
										>
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
												]}
											>
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
												]}
											>
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
												]}
											>
												<Input.Password />
											</Form.Item>
											<Form.Item
												style={{
													display: 'flex',
													justifyContent: 'flex-end',
												}}
											>
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
													htmlType='submit'
												>
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
									<Table
										scroll={{
											x: 800,
										}}
										loading={loadingOrder}
										columns={columns}
										dataSource={orderList}
									/>
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
