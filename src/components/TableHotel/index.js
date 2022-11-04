import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
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

export default function TableHotel() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [userRecord, setUserRecord] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [listHotels, setListHotels] = React.useState();
	const [additionInfo, setAdditionInfo] = React.useState(false);
	const [size, setSize] = useState('large');

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [tableToolTip, setTableToolTip] = useState(false);

	const [form] = Form.useForm();
	const { token } = UserAuth();
	const [searchDataSource, setSearchDataSource] = React.useState(listHotels);
	const { t } = useTranslation();
	const [page, setPage] = React.useState(1);
	const {
		CreateHotel,
		DeleteHotel,
		updateUserByAdmin,
		AddUserToDBByAdmin,
		GetAllHotel,
	} = UserAuth();
	const { lang } = UserLanguage();

	useEffect(() => {
		getAllHotelData();
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
			getAllHotelData();
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

	const handleDeleteHotel = async (id) => {
		try {
			await DeleteHotel(id);
			setListHotels(listHotels.filter((item) => item._id !== id));
			setSearchDataSource(
				searchDataSource.filter((item) => item._id !== id),
			);
		} catch (err) {
			console.log(err);
		}
	};

	const onFinishCreateUser = async (value) => {
		setLoadingCreate(true);
		try {
			await CreateHotel({
				name: 'Pet16',
				type: 'hotel',
				city: 'Hanoi',
				address: 'somewhere',
				distance: '500',
				title: 'Best Hotel in the City',
				desc: 'hotel description',
				cheapestPrice: 100,
			});
			setOpenUpdate(false);
			setLoadingCreate(false);
			setOpenCreate(false);
			toast.success(t('Create user success'));
			getAllHotelData();
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
			width: 110,

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
						onConfirm={() => handleDeleteHotel(record._id)}>
						<Button
							danger
							type='text'
							icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const getAllHotelData = async () => {
		try {
			const res = await GetAllHotel();
			setListHotels(res);
			setTableLoading(false);
		} catch (error) {
			console.error(error);
			setTableLoading(false);
		}
	};

	return (
		<>
			<div className='tablehotel-header'>
				<div className='tablehotel_leftheader'>
					<h2 className='tablehotel-header-title'>
						{t('management hotel')}
					</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type='text'></Button>
				</div>
				<div className='tablehotel_rightheader'>
					<SearchTableInput
						columns={columns}
						dataSource={listHotels} // 🔴 Original dataSource
						setDataSource={setSearchDataSource} // 🔴 Newly created setSearchDataSource from useState hook
						inputProps={{
							placeholder: t('Search'),
							prefix: <SearchOutlined />,
						}}
					/>
					<Button
						className='tablehotel_createbutton'
						loading={loadingCreate}
						type='primary'
						onClick={handleOpenCreateUser}>
						{t('Create Hotel')}
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
						dataSource={listHotels}
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
				dataSource={searchDataSource || listHotels}
				loading={tableLoading}
			/>
		</>
	);
}
