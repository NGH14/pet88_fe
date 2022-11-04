import React from 'react';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import './style.css';
import { InboxOutlined } from '@ant-design/icons';
import { async } from '@firebase/util';
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';

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
	const [showFile, setShowFile] = React.useState(true);

	const [uploading, setUploading] = React.useState(false);
	const { CreateHotel } = UserAuth();
	console.log(fileList);
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
					setShowFile(false);
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
			<Form>
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
						multiple={true}
						onClick={() => setShowFile(true)}
						showUploadList={showFile}
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
						}}>
						{uploading ? 'Uploading' : 'Start Upload'}
					</Button>
				</Form.Item>
			</Form>

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
		</>
	);
};
export default UploadFileHotel;
