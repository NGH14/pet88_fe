import { LockOutlined, SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import './style.css';
const { RangePicker } = DatePicker;
const FormBookingHomepage = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [destination, setDestination] = useState();
	const [listSearch, setListSearch] = useState();
	const navigate = useNavigate();
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	console.log(listSearch);
	useEffect(() => {}, []);

	const fetchHotelData = async (token, value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/find-hotel`,
				{
					params: {
						city: destination,
					},
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			);
			setListSearch(res.data);
			navigate('/hotel', {
				state: res.data,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const onFinish = (values) => {
		fetchHotelData();
	};
	return (
		<Form
			className='form_bookinghomepage'
			size='large'
			form={form}
			requiredMark={false}
			name='form_bookinghomepage'
			onFinish={onFinish}>
			<Form.Item style={{ width: '49%' }} name='city'>
				<Input
					prefix={<SearchOutlined />}
					className='form-item_bookinghomepage'
					onChange={(e) => setDestination(e.target.value)}
					placeholder={t('City name')}
				/>
			</Form.Item>
			<Form.Item style={{ width: '49%' }}>
				<RangePicker
					placeholder={[t('Drop off'), t('Pick up')]}
					placement='bottomLeft'
					className='form-item_bookinghomepage'
					format={lang === 'vi' ? 'DD-MM-YYYY' : null}
				/>
			</Form.Item>
			<Form.Item shouldUpdate style={{ width: '100%' }}>
				<Button
					type='primary'
					block={true}
					className='form-button_bookinghomepage'
					htmlType='submit'>
					{t('Search')}
				</Button>
			</Form.Item>
		</Form>
	);
};
export default FormBookingHomepage;
