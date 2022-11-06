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
	ReloadOutlined,
	DownOutlined,
	UploadOutlined,
	InboxOutlined,
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
	Upload,
	message,
	Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { UserLanguage } from '../../context/LanguageContext';
import moment from 'moment';
import axios from 'axios';
import './style.css';
const { Option } = Select;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const { Dragger } = Upload;

export default function TableHotel() {
	const [tableLoading, setTableLoading] = React.useState(true);
	const [deparmentRecord, SetDeparmentRecord] = React.useState({});
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
		UpdateHotel,
	} = UserAuth();
	const { lang } = UserLanguage();

	const [previewOpen, setPreviewOpen] = React.useState(false);
	const [previewImage, setPreviewImage] = React.useState('');
	const [previewTitle, setPreviewTitle] = React.useState('');
	const [fileList, setFileList] = React.useState([]);
	const [resetUpload, setResetUpload] = React.useState(true);
	const [showFile, setShowFile] = React.useState(true);

	const [uploading, setUploading] = React.useState(false);

	const handleUpload = async (e) => {
		try {
			const list = await Promise.all(
				Object.values(fileList).map(async (file) => {
					const data = new FormData();
					data.append('file', file);
					data.append('upload_preset', 'pet88_upload');

					const uploadRes = await axios.post(
						'https://api.cloudinary.com/v1_1/dggxjymsy/image/upload',
						data,
					);

					const { url } = uploadRes.data;
					setFileList([]);
					setResetUpload(!resetUpload);
					return url;
				}),
			);
			return list;
		} catch (err) {
			return err;
		}
	};

	const props = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);

			return false;
		},
	};

	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		);
	};

	useEffect(() => {
		getAllHotelData();
	}, []);

	const handleOpenUpdateUser = (record) => {
		SetDeparmentRecord(record);
		setOpenUpdate(true);
	};

	const handleOpenCreateUser = () => {
		setOpenCreate(true);
	};

	const onFinishUpdate = async (value) => {
		setLoading(true);
		try {
			await UpdateHotel(deparmentRecord._id, value);
			setLoading(false);
			toast.success(t('Update Department Success'));
			setOpenUpdate(false);
			getAllHotelData();
		} catch (e) {
			toast.error(t('Something went wrong! please try again'));
			console.log(e.message);
			setLoading(false);
		}
	};
	useEffect(() => form.resetFields(), [deparmentRecord, openCreate]);

	const fullWidth = global.window.innerWidth;

	const onCloseUpdateDepartment = () => {
		SetDeparmentRecord({});
		setOpenUpdate(false);
	};

	const onCloseCreateUser = () => {
		setOpenCreate(false);
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

	const onFinishCreateHotel = async (value) => {
		setLoadingCreate(true);
		try {
			const listImg = await handleUpload();

			const data = {
				...value,
				photos: listImg,
			};
			await CreateHotel(data);

			setLoadingCreate(false);
			setOpenCreate(false);
			getAllHotelData();
			toast.success(t('Created department'));
		} catch (e) {
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
			title: t('Type'),
			dataIndex: 'type',
			key: 'type',
			render: (text) => <p>{text}</p>,
		},
		{
			title: t('City'),
			dataIndex: 'city',
			key: 'City',
			render: (text) => <p>{text}</p>,
			sorter: (a, b) => a.City.length - b.City.length,
		},
		{
			title: t('Address'),
			dataIndex: 'address',
			key: 'address',
			render: (text) => <p>{text}</p>,
		},
		{
			title: t('Services'),
			dataIndex: 'services',
			key: 'services',
			render: (services) =>
				services.map((service) => (
					<Tag color={service?.length > 5 ? 'cyan' : 'gold'}>
						{service}
					</Tag>
				)),
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
		setTableLoading(true);
		try {
			const res = await GetAllHotel();
			setListHotels(res);
			setSearchDataSource(res);
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
						{t('management deparment')}
					</h2>
					<Button
						icon={<MoreOutlined style={{ fontSize: 20 }} />}
						onClick={() => setTableToolTip(!tableToolTip)}
						type='text'></Button>
				</div>
				<div className='tablehotel_rightheader'>
					<SearchTableInput
						columns={columns}
						dataSource={listHotels}
						setDataSource={setSearchDataSource}
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
						{t('Create Deparment')}
					</Button>
					<Button
						icon={
							<ReloadOutlined
								rotate={50}
								style={{ fontSize: 14 }}
							/>
						}
						onClick={() => getAllHotelData()}
						type='text'></Button>
				</div>
			</div>

			<Drawer
				title={t('Update')}
				width={fullWidth >= 1000 ? '878px' : fullWidth}
				onClose={onCloseUpdateDepartment}
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
							name: deparmentRecord?.name,
							tag: deparmentRecord?.tag,
							type: deparmentRecord?.type,
							city: deparmentRecord?.city,
							address: deparmentRecord?.address,
							title: deparmentRecord?.title,
							desc: deparmentRecord?.desc,
							services: deparmentRecord?.services,
						}}
						onFinish={onFinishUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item label={t('Name')} name='name'>
							<Input />
						</Form.Item>
						<Form.Item name='type' label={t('Type')}>
							<Select>
								<Option value='franchise'>
									{t('Franchise')}
								</Option>
								<Option value='owner'>{t('Owner')}</Option>
							</Select>
						</Form.Item>
						<Form.Item label={t('Address')} name='address'>
							<Input />
						</Form.Item>
						<Form.Item label={t('Title')} name='title'>
							<Input />
						</Form.Item>
						<Form.Item label={t('Describe')} name='desc'>
							<Input />
						</Form.Item>
						<Form.Item name='city' label={t('City')}>
							<Select>
								<Option value='Ho Chi Minh'>
									{t('Ho Chi Minh')}
								</Option>
								<Option value='Ha Noi'>{t('Ha Noi')}</Option>
								<Option value='Da Nang'>{t('Da Nang')}</Option>
							</Select>
						</Form.Item>{' '}
						<Form.Item name='services' label={t('Services')}>
							<Select mode='multiple'>
								<Option value='hotel'>{t('Hotel')}</Option>
								<Option value='grooming'>
									{t('Grooming')}
								</Option>
								<Option value='training'>
									{t('Training')}
								</Option>
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
								onClick={onCloseUpdateDepartment}>
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
				title={t('Create Hotel')}
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
						name='Create Hotel'
						size={'medium'}
						initialValues={{}}
						onFinish={onFinishCreateHotel}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}>
						<Form.Item label={t('Name')} name='name'>
							<Input />
						</Form.Item>
						<Form.Item name='type' label={t('Type')}>
							<Select>
								<Option value='franchise'>
									{t('Franchise')}
								</Option>
								<Option value='owner'>{t('Owner')}</Option>
							</Select>
						</Form.Item>
						<Form.Item label={t('Address')} name='address'>
							<Input />
						</Form.Item>
						<Form.Item label={t('Title')} name='title'>
							<Input />
						</Form.Item>
						<Form.Item label={t('Describe')} name='desc'>
							<Input />
						</Form.Item>
						<Form.Item name='city' label={t('City')}>
							<Select>
								<Option value='Ho Chi Minh'>
									{t('Ho Chi Minh')}
								</Option>
								<Option value='Ha Noi'>{t('Ha Noi')}</Option>
								<Option value='Da Nang'>{t('Da Nang')}</Option>
							</Select>
						</Form.Item>{' '}
						<Form.Item name='services' label={t('Services')}>
							<Select mode='multiple'>
								<Option value='hotel'>{t('Hotel')}</Option>
								<Option value='grooming'>
									{t('Grooming')}
								</Option>
								<Option value='training'>
									{t('Training')}
								</Option>
							</Select>
						</Form.Item>
						<Form.Item
							label='File'
							name='file'
							rules={[
								{
									required: true,
									message: 'Please input your File!',
								},
							]}>
							<Dragger
								accept='.png,.jpeg'
								maxCount={3}
								multiple={true}
								onClick={() => setShowFile(true)}
								onPreview={handlePreview}
								listType='picture'
								defaultFileList={[...fileList]}
								className='upload-list-inline'
								{...props}>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									Click or drag file to this area to upload
								</p>
								<p className='ant-upload-hint'>
									Support for a single or bulk upload.
									Strictly prohibit from uploading company
									data or other band files
								</p>
							</Dragger>
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
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}>
				<img
					alt='example'
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
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
