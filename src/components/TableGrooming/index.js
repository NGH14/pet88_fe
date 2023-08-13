import React, { useState } from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import {
	Table,
	ExportTableButton,
	SearchTableInput,
} from 'ant-table-extensions';

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
	Form,
	Input,
	Select,
	Popconfirm,
	Modal,
	InputNumber,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import './style.css';
const { Option } = Select;

export default function TableGrooming() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [groomingRecord, setGroomingRecord] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [listGroomings, setListGroomings] = React.useState();
	const [size, setSize] = useState('large');
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [tableToolTip, setTableToolTip] = useState(false);

	const [form] = Form.useForm();
	const { token } = UserAuth();
	const [searchDataSource, setSearchDataSource] =
		React.useState(listGroomings);
	const { t } = useTranslation();
	const [page, setPage] = React.useState(1);

	const { lang } = UserLanguage();

	const [hotelData, setHotelData] = React.useState([]);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);

	const fullWidth = global.window.innerWidth;

	const GetAllGrooming = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/grooming`);
			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const GetAllHotel = async () => {
		try {
			const res = await axios.get(`http://localhost:3001/api/hotel`);
			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const showModal = () => {
		setOpenModal(true);
	};
	const handleOkModal = async () => {
		setConfirmLoadingModal(true);
		setSelectedRowKeys([]);
		await handleDeleteMultipleGrooming();

		setOpenModal(false);
	};
	const handleCancelModal = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		getAllGroomingData();
		getAllHotelData();
	}, []);

	const handleOpenUpdateCategory = (record) => {
		setGroomingRecord(record);
		setOpenUpdate(true);
	};

	const handleOpenCreateRoom = async () => {
		setOpenCreate(true);
	};

	const onFinishUpdate = async (value) => {
		setLoading(true);
		try {
			const roomNumbers = value.roomNumbers.map((room) => ({
				number: room,
			}));

			const data = {
				...value,
				roomNumbers,
			};

			await axios.put(
				`http://localhost:3001/api/grooming/${groomingRecord._id}`,
				data,
			);

			setLoading(false);
			toast.success(t('Update Grooming Success'));
			setOpenUpdate(false);
			getAllGroomingData();
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));
			setLoading(false);
		}
	};
	useEffect(() => form.resetFields(), [groomingRecord, openCreate]);

	const onCloseUpdateRoom = () => {
		setGroomingRecord({});
		setOpenUpdate(false);
	};

	const onCloseCreateUser = () => {
		setOpenCreate(false);
	};

	const handleDeleteGrooming = async (id) => {
		try {
			const res = await axios.delete(
				`http://localhost:3001/api/grooming/${id}`,
				{},
			);

			setListGroomings(listGroomings.filter((item) => item._id !== id));
			setSearchDataSource(
				searchDataSource.filter((item) => item._id !== id),
			);
			toast.success(t('Delete Success'));

			return res.data;
		} catch (error) {
			return console.error(error);
		}
	};

	const onFinishCreateGrooming = async (value) => {
		setLoadingCreate(true);
		try {
			const departmentID = value.department;

			delete value.department;
			const roomNumbers = value.roomNumbers.map((room) => ({
				number: room,
			}));

			const data = {
				...value,
				hotelId: departmentID,
				roomNumbers,
			};

			await axios.post(
				`http://localhost:3001/api/grooming/${departmentID}`,
				data,
			);

			console.log({ data, departmentID });

			setLoadingCreate(false);
			setOpenCreate(false);
			getAllGroomingData();
			toast.success(t('Created Grooming'));
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

	const columns = [
		{
			title: t('Name'),
			dataIndex: 'title',
			key: 'title',
		},

		{
			title: t('Type'),
			dataIndex: 'type',
			key: 'type',
			render: (text) => <span>{t(text)}</span>,
		},
		{
			title: t('Price'),
			dataIndex: 'price',
			key: 'price',
			render: (text) => (
				<span>
					{' '}
					{new Intl.NumberFormat('vi-VI', {
						style: 'currency',
						currency: 'VND',
					}).format(text)}
				</span>
			),

			sorter: (a, b) => a.price - b.price,
		},
		{
			title: t('In Hotel'),
			dataIndex: 'Hotel',
			key: 'hotelID',
			render: (_, record) => (
				<span>
					{
						hotelData.find((hotel) => hotel._id === record.hotelId)
							?.name
					}
				</span>
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
						onConfirm={() => handleDeleteGrooming(record._id)}
					>
						<Button
							danger
							type='text'
							icon={<DeleteOutlined />}
						></Button>
					</Popconfirm>
					<Button
						type='text'
						key='update'
						icon={<EditOutlined />}
						onClick={() => handleOpenUpdateCategory(record)}
					></Button>
				</Space>
			),
		},
	];

	const handleDeleteMultipleGrooming = async () => {
		try {
			await axios.patch(
				`http://localhost:3001/api/grooming/multiple-delete`,
				selectedRowKeys,
			);
			setListGroomings(
				listGroomings.filter(
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
	const getAllGroomingData = async () => {
		setTableLoading(true);
		try {
			const res = await GetAllGrooming();
			const list = [];
			res.forEach((doc) => {
				list.push({ ...doc, key: doc._id });
			});
			setListGroomings(list);
			setSearchDataSource(list);

			setTableLoading(false);
		} catch (error) {
			console.error(error);
			setTableLoading(false);
		}
	};

	const getAllHotelData = async () => {
		try {
			const res = await GetAllHotel();
			const list = [];
			res.forEach((doc) => {
				list.push({ ...doc, key: doc._id });
			});
			setHotelData(list);
		} catch (error) {
			console.error(error);
		}
	};

	const expandedRowRender = (record) => {
		const subColumns = [
			{
				title: 'ID',
				dataIndex: '_id',
				key: '_id',
			},
			{
				title: t('Room Number'),
				dataIndex: 'number',
				key: 'number',
			},
		];
		return (
			<>
				<Table
					columns={subColumns}
					dataSource={record.roomNumbers}
					pagination={false}
				/>
				<p
					style={{
						margin: 15,
					}}
				>
					{t('Created Date')}
					{t(': ')}
					{new Date(record.createdAt).toLocaleString()}
				</p>
				<p
					style={{
						margin: 15,
					}}
				>
					{t('Last Update Date')}
					{t(': ')}
					{new Date(record.updatedAt).toLocaleString()}
				</p>
			</>
		);
	};

	return (
		<>
			<div className='tablegrooming-header'>
				<div className='tablegrooming_leftheader'>
					<h2 className='tablegrooming-header-title'>
						{t('management grooming service')}
					</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type='text'
					></Button>
				</div>
				<div className='tablegrooming_rightheader'>
					<SearchTableInput
						columns={columns}
						dataSource={listGroomings}
						setDataSource={setSearchDataSource}
						inputProps={{
							placeholder: t('Search'),
							prefix: <SearchOutlined />,
						}}
					/>
					<Button
						className='tablegrooming_createbutton'
						loading={loadingCreate}
						type='primary'
						onClick={handleOpenCreateRoom}
					>
						{t('Create new')}
					</Button>
					<Button
						icon={
							<ReloadOutlined
								rotate={50}
								style={{ fontSize: 14 }}
							/>
						}
						onClick={() => getAllGroomingData()}
						type='text'
					></Button>
				</div>
			</div>

			<Drawer
				title={t('Update')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseUpdateRoom}
				open={openUpdate}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				{openUpdate ? (
					<Form
						form={form}
						validateTrigger='onBlur'
						labelCol={{ span: 4 }}
						name='update room'
						size={'large'}
						initialValues={{
							type: groomingRecord?.type,
							price: groomingRecord?.price,
							title: groomingRecord?.title,
							maxPet: groomingRecord.maxPet,
							desc: groomingRecord?.desc,
							roomNumbers: groomingRecord?.roomNumbers?.map(
								(object) => object['number'],
							),
						}}
						onFinish={onFinishUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}
					>
						<Form.Item label={t('Title')} name='title'>
							<Input />
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

						<Form.Item name='roomNumbers' label={t('Room Number')}>
							<Select mode='tags' />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}
						>
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
								onClick={onCloseUpdateRoom}
							>
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
								htmlType='submit'
							>
								{t('Confirm')}
							</Button>
						</Form.Item>
					</Form>
				) : null}
			</Drawer>

			<Drawer
				title={t('Create Grooming Service')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseCreateUser}
				open={openCreate}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				{openCreate ? (
					<Form
						form={form}
						validateTrigger='onBlur'
						labelCol={{ span: 4 }}
						name='Create Grooming'
						size={'medium'}
						initialValues={{}}
						onFinish={onFinishCreateGrooming}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}
					>
						<Form.Item name='department' label={t('Department')}>
							<Select>
								{hotelData.map((data) => (
									<Select.Option value={data?._id}>
										{data?.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label={t('Title')} name='title'>
							<Input />
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
							}}
						>
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
								onClick={onCloseCreateUser}
							>
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
								htmlType='submit'
							>
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
						onChange={setSize}
					>
						<Option value='small'> {t('Small')}</Option>
						<Option value='middle'>{t('Medium')}</Option>
						<Option value='large'>{t('Large')}</Option>
					</Select>

					<ExportTableButton
						dataSource={listGroomings}
						columns={columns}
						btnProps={{
							type: 'primary',
							icon: <FileExcelOutlined />,
						}}
						showColumnPicker
					>
						{t('Export')}
					</ExportTableButton>
				</div>
			) : null}

			<Modal
				width={400}
				closable={false}
				footer={null}
				open={openModal}
				confirmLoading={confirmLoadingModal}
			>
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
						}}
					>
						<Button
							onClick={handleCancelModal}
							style={{ borderRadius: 8 }}
						>
							{t('Cancel')}
						</Button>
						<Button
							onClick={handleOkModal}
							style={{ borderRadius: 8 }}
							type='primary'
							danger
						>
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
						className='table_deletemulpti-deselect'
					>
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
						className='table_deletemulpti-delete'
					>
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
					defaultPageSize: 5,
					showSizeChanger: true,
					pageSizeOptions: ['5', '10', '20', '30'],
					hideOnSinglePage: true,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
				}}
				columns={columns}
				dataSource={searchDataSource || listGroomings}
				loading={tableLoading}
			/>
		</>
	);
}
