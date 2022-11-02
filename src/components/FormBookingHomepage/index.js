import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const FormBookingHomepage = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [destination, setDestination] = useState({});
	const [listSearch, setListSearch] = useState();

	useEffect(() => {
		console.log(listSearch);
	}, []);

	const fetchHotelData = async (token, value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/countByCity?cities=${destination}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			);
			setListSearch(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const onFinish = (values) => {
		fetchHotelData();
	};
	return (
		<Form
			form={form}
			name='horizontal_login'
			layout='inline'
			onFinish={onFinish}>
			<Form.Item
				name='cities'
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}>
				<Input
					onChange={(e) => setDestination(e.target.value)}
					prefix={<UserOutlined className='site-form-item-icon' />}
					placeholder='Username'
				/>
			</Form.Item>

			<Form.Item shouldUpdate>
				{() => (
					<Button
						type='primary'
						htmlType='submit'
						disabled={
							!form.isFieldsTouched(true) ||
							!!form
								.getFieldsError()
								.filter(({ errors }) => errors.length).length
						}>
						Log in
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};
export default FormBookingHomepage;
