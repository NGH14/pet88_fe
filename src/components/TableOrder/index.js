import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
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
	ReloadOutlined,
	DownOutlined,
	UploadOutlined,
	InboxOutlined,
} from '@ant-design/icons';
import { AiOutlineClose } from 'react-icons/ai';

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
	Upload,
	message,
	Modal,
	InputNumber,
	Checkbox,
	Radio,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
import moment from 'moment';
import axios from 'axios';
import './style.css';
import { ToVND } from './../../utils/FormatCurrency';
const { Option } = Select;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const { Dragger } = Upload;

export default function TableOrder() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [orderRecord, setorderRecord] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [listorders, setListorders] = React.useState();
	const [size, setSize] = useState('large');
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [tableToolTip, setTableToolTip] = useState(false);
	const photo =
		'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';
	const [form] = Form.useForm();
	const { token } = UserAuth();
	const [searchDataSource, setSearchDataSource] = React.useState(listorders);
	const { t } = useTranslation();
	const [page, setPage] = React.useState(1);
	const { user, GetAllUser } = UserAuth();
	const { lang } = UserLanguage();

	const [userData, setUserData] = React.useState([]);
	const [userDataOption, setUserDataOpion] = React.useState([]);
	const [accountType, setAccountType] = React.useState(true);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);

	const fullWidth = global.window.innerWidth;

	const GetAllorder = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/order`);
			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	// const GetAllHotel = async () => {
	// 	try {
	// 		const res = await axios.get(`http://localhost:3001/api/hotel`);
	// 		return res.data;
	// 	} catch (error) {
	// 		return console.error(error);
	// 	}
	// };

	const showModal = () => {
		setOpenModal(true);
	};
	const handleOkModal = async () => {
		setConfirmLoadingModal(true);
		setSelectedRowKeys([]);
		await handleDeleteMultipleorder();

		setOpenModal(false);
	};
	const handleCancelModal = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		getAllOrderData();
		getAllUserData();
	}, []);

	const handleOpenUpdateCategory = (record) => {
		setorderRecord(record);
		setOpenUpdate(true);
	};

	const handleOpenCreateRoom = async () => {
		setOpenCreate(true);
	};

	const onFinishUpdate = async (value) => {
		setLoading(true);
		try {
			await axios.put(
				`http://localhost:3001/api/order/update-status/${orderRecord._id}`,
				value,
			);

			setLoading(false);
			toast.success(t('Update order Success'));
			setOpenUpdate(false);
			getAllOrderData();
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));
			setLoading(false);
		}
	};
	useEffect(() => form.resetFields(), [orderRecord, openCreate]);

	const onCloseUpdateRoom = () => {
		setorderRecord({});
		setOpenUpdate(false);
	};

	const onCloseCreateUser = () => {
		setOpenCreate(false);
	};

	const handleDeleteOrder = async (id) => {
		try {
			const res = await axios.delete(
				`http://localhost:3001/api/order/${id}`,
				{},
			);

			setListorders(listorders.filter((item) => item._id !== id));
			setSearchDataSource(
				searchDataSource.filter((item) => item._id !== id),
			);
			toast.success(t('Delete Success'));

			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};
	const onFinishCreateOrder = async (value) => {
		setLoadingCreate(true);
		try {
			const bookingUser = value.account
				? userData.find((u) => u.email === value.user)
				: { id: 'guest', email: value.user, phone: -1 };

			// await axios
			// 	.post(`http://localhost:3001/api/order/cash`, {
			// 		email: user?.email,
			// 		userID: user?.id || 'guest',
			// 		roomList: sumPriceMap,
			// 		photo: photo,
			// 		days: search.days,
			// 		price: totalPrice,
			// 		start: search.datesHotels[0],
			// 		end: search.datesHotels[1],
			// 		paymentMethod: value?.paymentMethod,
			// 		service: search.services,

			// 		...value,
			// 	})
			// 	.then((response) => {
			// 		setLoading(false);
			// 		navigate('/booking/success');
			// 	})
			// 	.catch((err) => console.log(err.message));
			// const roomNumbers = value.roomNumbers.map((room) => ({
			// 	number: room,
			// }));

			// const data = {
			// 	...value,
			// 	hotelId: departmentID,
			// 	roomNumbers,
			// };

			// await axios.post(
			// 	`http://localhost:3001/api/order/${departmentID}`,
			// 	data,
			// );

			console.log({ value, bookingUser });

			setLoadingCreate(false);
			// setOpenCreate(false);
			getAllOrderData();
			toast.success(t('Created order'));
		} catch (e) {
			console.log(e.message);
			setLoadingCreate(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onSelectChange = (newSelectedRowKeys) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const getAllUserData = async () => {
		setTableLoading(true);

		try {
			const list = [];
			const option = [];

			const users = await GetAllUser();
			users.forEach((doc) => {
				list.push({ id: doc.id, ...doc.data(), key: doc.id });
			});
			list.forEach((doc) => {
				option.push({ value: doc.email, label: doc.email });
			});
			setUserDataOpion(option);
			setUserData(list);
			setTableLoading(false);
		} catch (error) {
			toast.error(t('Fail to load user data'));
			setTableLoading(false);
			console.log(error);
		}
	};
	const columns = [
		{
			title: 'Order ID',
			dataIndex: '_id',
			key: 'email',
			render: (text) => <span>{text}</span>,
		},
		{
			title: 'Service',
			dataIndex: 'service',
			key: 'service',
			render: (text) => <span>{text}</span>,
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
			render: (text) => <span>{text}</span>,
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

		{
			width: 110,
			title: t('Action'),
			fixed: 'right',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Popconfirm
						key='delete'
						title={t('Are you sure to delete?')}
						onConfirm={() => handleDeleteOrder(record._id)}>
						<Button
							danger
							type='text'
							icon={<DeleteOutlined />}></Button>
					</Popconfirm>
					<Button
						type='text'
						key='update'
						icon={<EditOutlined />}
						onClick={() =>
							handleOpenUpdateCategory(record)
						}></Button>
				</Space>
			),
		},
	];

	const handleDeleteMultipleorder = async () => {
		try {
			await axios.patch(
				`http://localhost:3001/api/order/multiple-delete`,
				selectedRowKeys,
			);
			setListorders(
				listorders.filter(
					(item) => !selectedRowKeys.includes(item._id),
				),
			);
			setSearchDataSource(
				searchDataSource.filter(
					(item) => !selectedRowKeys.includes(item._id),
				),
			);

			toast.success(t('Delete Success'));
		} catch (error) {
			console.log(error);
		}
	};
	const getAllOrderData = async () => {
		setTableLoading(true);
		try {
			const res = await GetAllorder();
			const list = [];
			res.forEach((doc) => {
				list.push({ ...doc, key: doc._id });
			});
			setListorders(list);
			setSearchDataSource(list);

			setTableLoading(false);
		} catch (error) {
			console.error(error);
			setTableLoading(false);
		}
	};

	// const getAllHotelData = async () => {
	// 	try {
	// 		const res = await GetAllHotel();
	// 		const list = [];
	// 		res.forEach((doc) => {
	// 			list.push({ ...doc, key: doc._id });
	// 		});
	// 		setUserData(list);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const expandedRowRender = (record) => {
		const subColumns = [
			{
				title: 'Room ID',
				dataIndex: 'roomId',
				key: 'roomId',
			},
			{
				title: t('Room Number'),
				dataIndex: 'roomNumber',
				key: 'roomNumber',
			},
			{
				title: t('Price'),
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
		];
		return (
			<>
				{record.service === 'hotel' ? (
					<Table
						columns={subColumns}
						dataSource={record.products}
						pagination={false}
					/>
				) : null}
				<p
					style={{
						margin: 15,
					}}>
					{t('Created Date')}
					{t(': ')}
					{new Date(record.createdAt).toLocaleString()}
				</p>
				<p
					style={{
						margin: 15,
					}}>
					{t('Last Update Date')}
					{t(': ')}
					{new Date(record.updatedAt).toLocaleString()}
				</p>
			</>
		);
	};

	return (
		<>
			<div className='tableorder-header'>
				<div className='tableorder_leftheader'>
					<h2 className='tableorder-header-title'>
						{t('management order')}
					</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type='text'></Button>
				</div>
				<div className='tableorder_rightheader'>
					<SearchTableInput
						columns={columns}
						dataSource={listorders}
						setDataSource={setSearchDataSource}
						inputProps={{
							placeholder: t('Search'),
							prefix: <SearchOutlined />,
						}}
					/>
					{/* <Button
						className='tableorder_createbutton'
						loading={loadingCreate}
						type='primary'
						onClick={handleOpenCreateRoom}>
						{t('Create new')}
					</Button> */}
					<Button
						icon={
							<ReloadOutlined
								rotate={50}
								style={{ fontSize: 14 }}
							/>
						}
						onClick={() => getAllOrderData()}
						type='text'></Button>
				</div>
			</div>

			<Drawer
				title={t('Update')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseUpdateRoom}
				open={openUpdate}
				bodyStyle={{
					paddingBottom: 80,
				}}>
				{openUpdate ? (
					<Form
						form={form}
						validateTrigger='onBlur'
						labelCol={{ span: 4 }}
						name='update room'
						size={'large'}
						initialValues={{
							confirm: orderRecord?.confirm,
							paid: orderRecord?.paid,
						}}
						onFinish={onFinishUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item name='confirm' label={t('Confirm')}>
							<Select>
								<Option value='unconfimred'>
									{t('Unconfimred')}
								</Option>
								<Option value='confimred'>
									{t('Confimred')}
								</Option>
							</Select>
						</Form.Item>
						<Form.Item name='paid' label={t('Status')}>
							<Select>
								<Option value='success'>{t('Success')}</Option>
								<Option value='unpaid'>{t('Unpaid')}</Option>
								<Option value='cancel'>{t('Cancel')}</Option>
							</Select>
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
								onClick={onCloseUpdateRoom}>
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

			<Drawer
				title={t('Create Order')}
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
						name='Create order'
						size={'medium'}
						initialValues={{}}
						onFinish={onFinishCreateOrder}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item
							label={t('Account')}
							name='account'
							initialValue={true}>
							<Radio.Group
								value={accountType}
								onChange={(e) =>
									setAccountType(e.target.value)
								}>
								<Radio value={false}>{t('Guest')}</Radio>
								<Radio value={true}>{t('Has Account')}</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item name='user' label={t('User Email')}>
							{accountType ? (
								<Select
									showSearch
									options={userDataOption}
									filterOption={(input, option) =>
										(option?.label ?? '')
											.toLowerCase()
											.includes(input.toLowerCase())
									}></Select>
							) : (
								<Input />
							)}
						</Form.Item>
						<Form.Item name='type' label={t('Type')}>
							<Select>
								<Option value='dogandcat'>
									{t('Dog and Cat')}
								</Option>
								<Option value='reptile '>
									{t('Reptile ')}
								</Option>
							</Select>
						</Form.Item>
						<Form.Item label={t('Price')} name='price'>
							<InputNumber
								formatter={(value) =>
									`${value}`.replace(
										/\B(?=(\d{3})+(?!\d))/g,
										',',
									)
								}
								prefix={'₫'}
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label={t('Describe')} name='desc'>
							<Input />
						</Form.Item>
						<Form.Item label={t('Max Pet')} name='maxPet'>
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item name='roomNumbers' label={t('Room Number')}>
							<Select mode='tags' />
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
						dataSource={listorders}
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

			<Modal
				width={400}
				closable={false}
				footer={null}
				open={openModal}
				confirmLoading={confirmLoadingModal}>
				<div>
					<h6 style={{ fontWeight: 700, fontSize: 16 }}>
						{t('Delete')} {selectedRowKeys.length} {t('room')}{' '}
						{t('selected')}?
					</h6>
					<p style={{ fontWeight: 500, fontSize: 14 }}>
						{t('This will permanently remove')} {t('room')}
					</p>
					<div
						style={{
							marginTop: 20,

							display: 'flex',
							gap: 5,
							justifyContent: 'flex-end',
						}}>
						<Button
							onClick={handleCancelModal}
							style={{ borderRadius: 8 }}>
							{t('Cancel')}
						</Button>
						<Button
							onClick={handleOkModal}
							style={{ borderRadius: 8 }}
							type='primary'
							danger>
							{t('Delete')}
						</Button>
					</div>
				</div>
			</Modal>
			{selectedRowKeys.length > 0 ? (
				<div className='table_deletemulpti'>
					<span className='table_deletemulpti-span'>
						{selectedRowKeys.length} {t('selected')} |
					</span>
					<Button
						type='text'
						onClick={() => setSelectedRowKeys([])}
						className='table_deletemulpti-deselect'>
						{t('Deselect')}
					</Button>
					<Button
						danger
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						icon={
							<AiOutlineClose
								color='red'
								style={{ marginRight: 5 }}
							/>
						}
						onClick={() => showModal()}
						className='table_deletemulpti-delete'>
						{t('Delete')}
					</Button>
				</div>
			) : null}
			<Table
				rowKey={(record) => record.key}
				rowSelection={rowSelection}
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
				expandable={{
					expandedRowRender: (record) => expandedRowRender(record),
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
				dataSource={searchDataSource || listorders}
				loading={tableLoading}
			/>
		</>
	);
}
