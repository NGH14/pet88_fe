import { LockOutlined, SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, DatePicker, Select, Paragraph } from 'antd';
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
	const navigate = useNavigate();
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

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
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	const fetchHotelNumber = async (value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/countByCity?cities=${value.city}`,
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	const onFinish = async (values) => {
		const foundData = await fetchHotelData(values);
		const foundNumber = await fetchHotelNumber(values);
		if (values.dates) {
			const days = dayDifference(
				values.dates[0].toDate(),
				values.dates[1].toDate(),
			);
			navigate('/department', {
				state: { city: values.city, foundData, foundNumber, days },
			});
		}
		navigate('/department', {
			state: {
				city: values.city,
				foundData,
				foundNumber,
				days: undefined,
			},
		});
	};

	function dayDifference(date1, date2) {
		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return diffDays;
	}

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

			<Form.Item name='dates' style={{ width: '49%' }}>
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
