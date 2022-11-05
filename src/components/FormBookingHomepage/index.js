import { LockOutlined, SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import './style.css';
const { RangePicker } = DatePicker;
const { Option } = Select;

const FormBookingHomepage = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const navigate = useNavigate();
	const { lang } = UserLanguage();
	const { t } = useTranslation();

	const fetchHotelData = async (value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/find-hotel`,
				{
					params: {
						city: value.city,
					},
				},
			);
			navigate('/hotel', {
				state: res.data,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const onFinish = (values) => {
		fetchHotelData(values);
	};
	return (
		<Form
			className='form_bookinghomepage'
			size='large'
			form={form}
			requiredMark={false}
			name='form_bookinghomepage'
			initialValues={{
				city: 'Ho Chi Minh',
			}}
			onFinish={onFinish}>
			<Form.Item style={{ width: '300px' }} name='city'>
				<Select
					showSearch
					filterOption={(input, option) =>
						(option?.value ?? '')
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					className='form-item_bookinghomepage'>
					<Option value='Ho Chi Minh'>{t('Ho Chi Minh')}</Option>
					<Option value='Ha Noi'>{t('Ha Noi')}</Option>
					<Option value='Da Nang'>{t('Da Nang')}</Option>
				</Select>
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
