import React from 'react';
import { Button, Form, message, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';

import 'antd/dist/antd.css';
import './style.css';

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
const { Dragger } = Upload;

const UploadFileHotel = () => {
	const [previewOpen, setPreviewOpen] = React.useState(false);
	const [previewImage, setPreviewImage] = React.useState('');
	const [previewTitle, setPreviewTitle] = React.useState('');
	const [fileList, setFileList] = React.useState([]);
	const [resetUpload, setResetUpload] = React.useState(true);
	const [showFile, setShowFile] = React.useState(true);
	const [form] = Form.useForm();

	const [uploading, setUploading] = React.useState(false);
	const { CreateHotel } = UserAuth();
	console.log(fileList);

	React.useEffect(() => form.resetFields(), [resetUpload]);

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
			const newhotel = {
				name: 'Pet16',
				type: 'hotel',
				city: 'Hanoi',
				address: 'somewhere',
				distance: '500',
				title: 'Best Hotel in the City',
				desc: 'hotel description',
				room: [],
				cheapestPrice: 100,
				photos: list,
			};
			// await CreateHotel(newhotel);
		} catch (err) {
			console.log(err);
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
			const isPNG = file.type === 'image/png';
			const isJPG = file.type === 'image/jpg';

			if (!isPNG || isJPG) {
				message.error(`${file.name} is not a png/jpg file`);
			}
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

	return (
		<>
			<Form form={form}>
				<Form.Item
					label='File'
					name='file'
					rules={[
						{
							required: true,
							message: 'Please input your File!',
						},
					]}
				>
					<Dragger
						accept='.png,.jpeg'
						maxCount={3}
						multiple={true}
						onClick={() => setShowFile(true)}
						onPreview={handlePreview}
						listType='picture'
						defaultFileList={[...fileList]}
						className='upload-list-inline'
						{...props}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag file to this area to upload
						</p>
						<p className='ant-upload-hint'>
							Support for a single or bulk upload. Strictly
							prohibit from uploading company data or other band
							files
						</p>
					</Dragger>
					<Button
						type='primary'
						onClick={handleUpload}
						disabled={fileList.length === 0}
						loading={uploading}
						style={{
							marginTop: 16,
						}}
					>
						{uploading ? 'Uploading' : 'Start Upload'}
					</Button>
				</Form.Item>
			</Form>

			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt='example'
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	);
};
export default UploadFileHotel;
