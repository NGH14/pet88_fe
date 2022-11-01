import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import {
	Table,
	ExportTableButton,
	SearchTableInput,
} from 'ant-table-extensions';
import { storage } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	FileExcelOutlined,
	SearchOutlined,
	DeleteOutlined,
	EditOutlined,
	MoreOutlined,
	UpOutlined,
	DownOutlined,
} from '@ant-design/icons';

import {
	Button,
	Drawer,
	Space,
	Tag,
	Form,
	Input,
	Select,
	DatePicker,
	Popconfirm,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
import moment from 'moment';
import axios from 'axios';
import './style.css';
const { Option } = Select;

export default function TableUser() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [userRecord, setUserRecord] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [listUsers, setListUsers] = React.useState();
	const [additionInfo, setAdditionInfo] = React.useState(false);

	const [size, setSize] = useState('large');

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [tableToolTip, setTableToolTip] = useState(false);

	const [form] = Form.useForm();
	const { token } = UserAuth();
	const [searchDataSource, setSearchDataSource] = React.useState(listUsers);
	const { t } = useTranslation();
	const [page, setPage] = React.useState(1);

	const {
		user,
		GetAllUser,
		DeleteUser,
		updateUserByAdmin,
		AddUserToDBByAdmin,
	} = UserAuth();
	const { lang } = UserLanguage();
	useEffect(() => {
		getAllUserData();
	}, []);

	const handleOpenUpdateUser = (record) => {
		setUserRecord(record);
		setOpenUpdate(true);
	};

	const handleOpenCreateUser = () => {
		setOpenCreate(true);
	};

	const onFinishUpdate = async (value) => {
		setLoading(true);
		try {
			await updateUserByAdmin(userRecord?.id, value);
			setLoading(false);
			toast.success(t('Update Profile Success'));
			getAllUserData();
			setOpenUpdate(false);
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));
			console.log(e.message);
			setLoading(false);
		}
	};
	useEffect(() => form.resetFields(), [userRecord, openCreate]);

	const fullWidth = global.window.innerWidth;

	const onCloseUpdateUser = () => {
		setUserRecord({});
		setOpenUpdate(false);
	};

	const onCloseCreateUser = () => {
		setOpenCreate(false);
	};

	const fetchDeleteData = async (token, id) => {
		try {
			const res = await axios.delete(
				`http://localhost:3001/api/user/${id}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCreateData = async (token, value) => {
		try {
			const res = await axios.post(
				`http://localhost:3001/api/user/`,
				value,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			await DeleteUser(id);
			fetchDeleteData(token, id);
			setListUsers(listUsers.filter((item) => item.id !== id));
		} catch (err) {
			console.log(err);
		}
	};

	const onFinishCreateUser = async (value) => {
		setLoadingCreate(true);

		try {
			const uid = await fetchCreateData(token, value);
			await AddUserToDBByAdmin(uid, value);
			setOpenUpdate(false);
			setLoadingCreate(false);
			setOpenCreate(false);
			toast.success(t('Create user success'));
			getAllUserData();
		} catch (e) {
			toast.error(t('The email already in use'));
			console.log(e.message);
			setLoadingCreate(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const columns = [
		{
			title: t('Name'),
			dataIndex: 'name',
			key: 'name',
			render: (text) => <p>{text}</p>,
			sorter: (a, b) => a.name.length - b.name.length,
		},

		{
			title: t('Phone Number'),
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 210,
		},
		{
			title: t('Tags'),
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: t('Gender'),
			dataIndex: 'gender',
			key: 'gender',
			render: (text) => <p>{t(text)}</p>,
		},
		{
			title: t('Role'),
			dataIndex: 'role',
			key: 'role',
			render: (text) => <p>{t(text)}</p>,
		},

		{
			title: t('ID'),
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: t('Action'),
			fixed: 'right',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button
						type='text'
						key='update'
						icon={<EditOutlined />}
						onClick={() => handleOpenUpdateUser(record)}></Button>
					<Popconfirm
						key='delete'
						title={t('Are you sure to delete?')}
						onConfirm={() => handleDeleteUser(record.id)}>
						<Button
							danger
							type='text'
							icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const getAllUserData = async () => {
		const list = [];
		try {
			const users = await GetAllUser();
			users.forEach((doc) => {
				// doc.data() is never undefined for query doc
				list.push({ id: doc.id, ...doc.data() });
			});
			setListUsers(list);
			setTableLoading(false);
		} catch (error) {
			toast.error(t('Fail to load user data'));
			setTableLoading(false);

			console.log(error);
		}
	};

	return (
		<>
			<div className='tableuser-header'>
				<div className='tableuser_leftheader'>
					<h2 className='tableuser-header-title'>
						{t('management users')}
					</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type='text'></Button>
				</div>
				<div className='tableuser_rightheader'>
					<SearchTableInput
						columns={columns}
						dataSource={listUsers} // 🔴 Original dataSource
						setDataSource={setSearchDataSource} // 🔴 Newly created setSearchDataSource from useState hook
						inputProps={{
							placeholder: t('Search'),
							prefix: <SearchOutlined />,
						}}
					/>
					<Button
						className='tableuser_createbutton'
						loading={loadingCreate}
						type='primary'
						onClick={handleOpenCreateUser}>
						{t('Create User')}
					</Button>
				</div>
			</div>

			<Drawer
				title={t('Update')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseUpdateUser}
				open={openUpdate}
				bodyStyle={{
					paddingBottom: 80,
				}}>
				{openUpdate ? (
					<Form
						form={form}
						validateTrigger='onBlur'
						labelCol={{ span: 4 }}
						name='update user'
						size={'large'}
						initialValues={{
							name: userRecord?.name,
							phone: userRecord?.phone,
							gender: userRecord?.gender,
							dob: moment(userRecord?.dob?.toDate()),
							email: userRecord?.email,
							role: userRecord?.role,
							tag: userRecord?.tag,
						}}
						onFinish={onFinishUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item
							label={t('Name')}
							name='name'
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item name='dob' label={t('Date of Birth')}>
							<DatePicker
								disabledDate={(current) => current > moment()}
								format={lang === 'vi' ? 'DD-MM-YYYY' : null}
							/>
						</Form.Item>
						<Form.Item name='gender' label={t('Gender')}>
							<Select>
								<Option value='male'>{t('Male')}</Option>
								<Option value='female'>{t('Female')}</Option>
								<Option value='other'>{t('Other')}</Option>
							</Select>
						</Form.Item>
						<Form.Item name='role' label={t('Role')}>
							<Select>
								<Option value='user'>{t('User')}</Option>
								<Option
									value='admin'
									disabled={!user?.role === 'admin'}>
									{t('Admin')}
								</Option>
								<Option value='Manager'>{t('Manager')}</Option>
							</Select>
						</Form.Item>
						<Form.Item name='tag' label={t('Tags')}>
							<Select mode='tags'>
								<Option value='vip'>{t('V.I.P')}</Option>
								<Option value='OCD'>{t('O.C.D')}</Option>
							</Select>
						</Form.Item>
						<Form.Item
							type='number'
							name='phone'
							label={t('Phone Number')}>
							<Input
								style={{
									width: '100%',
								}}
							/>
						</Form.Item>
						<Form.Item label='Email' name='email'>
							<Input disabled />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}>
							<Button
								style={{
									marginInline: 15,
									height: 'fit-content',
									fontSize: 16,
									lineHeight: 1.8,
									borderRadius: 5,
									boxShadow:
										'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={onCloseUpdateUser}>
								{t('Close')}
							</Button>
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
				) : null}
			</Drawer>
			<Drawer
				title={t('Create new user')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseCreateUser}
				open={openCreate}
				bodyStyle={{
					paddingBottom: 80,
				}}>
				{openCreate ? (
					<Form
						form={form}
						validateTrigger='onBlur'
						labelCol={{ span: 4 }}
						name='Create User'
						size={'medium'}
						initialValues={{}}
						onFinish={onFinishCreateUser}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item
							label={t('Name')}
							name='name'
							rules={[
								{
									required: true,
									message: 'Please input your name!',
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							label={t('Email')}
							name='email'
							rules={[
								{
									required: true,
									message: 'Please enter your email!',
								},
								{
									type: 'email',
									message: 'Invalid enter your email!',
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							label={t('Password')}
							name='password'
							rules={[
								{
									required: true,
									message: 'Please enter your password!',
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
							label={t('Confirm Password')}
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
							<Input.Password />
						</Form.Item>

						<Button
							style={{ margin: 15 }}
							type='text'
							onClick={() => setAdditionInfo(!additionInfo)}>
							{t('Addition Information')}{' '}
							{additionInfo ? (
								<UpOutlined style={{ fontSize: 12 }} />
							) : (
								<DownOutlined style={{ fontSize: 12 }} />
							)}
						</Button>
						{additionInfo && (
							<>
								<Form.Item
									name='dob'
									label={t('Date of Birth')}>
									<DatePicker
										disabledDate={(current) =>
											current > moment()
										}
										format={
											lang === 'vi' ? 'DD-MM-YYYY' : null
										}
									/>
								</Form.Item>
								<Form.Item name='gender' label={t('Gender')}>
									<Select>
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
								<Form.Item name='role' label={t('Role')}>
									<Select>
										<Option value='user'>
											{t('User')}
										</Option>
										<Option
											value='admin'
											disabled={!user?.role === 'admin'}>
											{t('Admin')}
										</Option>
										<Option value='Manager'>
											{t('Manager')}
										</Option>
									</Select>
								</Form.Item>
								<Form.Item name='tag' label={t('Tags')}>
									<Select mode='tags'>
										<Option value='vip'>
											{t('V.I.P')}
										</Option>
										<Option value='OCD'>
											{t('O.C.D')}
										</Option>
									</Select>
								</Form.Item>
								<Form.Item
									type='number'
									name='phone'
									label={t('Phone Number')}>
									<Input
										style={{
											width: '100%',
										}}
									/>
								</Form.Item>
							</>
						)}

						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}>
							<Button
								style={{
									marginInline: 15,
									height: 'fit-content',
									fontSize: 16,
									lineHeight: 1.8,
									borderRadius: 5,
									boxShadow:
										'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={onCloseCreateUser}>
								{t('Close')}
							</Button>
							<Button
								loading={loadingCreate}
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
				) : null}
			</Drawer>

			{tableToolTip ? (
				<div className='table_tooltip'>
					<Select
						bordered={false}
						defaultValue='large'
						style={{
							width: 100,
						}}
						onChange={setSize}>
						<Option value='small'> {t('Small')}</Option>
						<Option value='middle'>{t('Medium')}</Option>
						<Option value='large'>{t('Large')}</Option>
					</Select>

					<ExportTableButton
						dataSource={listUsers}
						columns={columns}
						btnProps={{
							type: 'primary',
							icon: <FileExcelOutlined />,
						}}
						showColumnPicker>
						{t('Export')}
					</ExportTableButton>
				</div>
			) : null}

			<Table
				size={size}
				style={{
					backgroundColor: 'white',
					padding: 20,
					marginBlock: 10,
					borderRadius: 15,
					boxShadow: 'rgb(153 196 227 / 25%) 0px 2px 8px',
				}}
				scroll={{
					x: 800,
				}}
				pagination={{
					onChange(current) {
						setPage(current);
					},
					defaultPageSize: 5,
					showSizeChanger: true,
					pageSizeOptions: ['5', '10', '20', '30'],
				}}
				columns={columns}
				dataSource={searchDataSource || listUsers}
				loading={tableLoading}
			/>
		</>
	);
}
