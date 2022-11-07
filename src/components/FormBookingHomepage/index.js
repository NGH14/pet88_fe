import { LockOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
	Button,
	Form,
	Input,
	DatePicker,
	Select,
	Paragraph,
	Radio,
	Divider,
} from 'antd';
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
	const [type, setType] = useState('hotel');
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const currentDate = moment();
	const futureMonth = moment(currentDate).add(1, 'M');
	const futureWeek = moment(currentDate).add(1, 'W');

	const fetchHotelData = async (value) => {
		try {
			const res = await axios.get(
				`http://localhost:3001/api/hotel/find-hotel`,
				{
					params: {
						city: value.city,
						services: type,
					},
				},
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	// const fetchHotelNumber = async (value) => {
	// 	try {
	// 		const res = await axios.get(
	// 			`http://localhost:3001/api/hotel/countByCity?cities=${value.city}`,
	// 		);
	// 		return res.data;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const onFinish = async (values) => {
		const foundData = await fetchHotelData(values);

		if (!values.datesHotels && !values.datesGrooming) {
			navigate('/search', {
				state: {
					services: type,
					city: values.city,
					foundData,
					foundNumber: foundData?.length,
				},
			});
		}

		if (values.datesHotels) {
			const date = [
				values.datesHotels[0].toDate(),
				values.datesHotels[1].toDate(),
			];

			navigate('/search', {
				state: {
					services: type,
					city: values.city,
					foundData,
					foundNumber: foundData?.length,
					datesHotels: date,
				},
			});
		}

		if (values.datesGrooming) {
			const date = values.datesGrooming.toDate().getTime();
			navigate('/search', {
				state: {
					services: type,
					city: values.city,
					foundData,
					foundNumber: foundData?.length,
					datesGrooming: date,
				},
			});
		}
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					gap: 15,
					alignItems: 'center',
				}}>
				<span>{t("I'm looking for service")}</span>
				<Radio.Group
					style={{ display: 'flex', gap: 15 }}
					defaultValue='hotel'
					size='large'
					onChange={(e) => setType(e.target.value)}>
					<Radio className='radio_formType' value='hotel'>
						{t('hotel')}
					</Radio>
					<Radio value='grooming'>{t('grooming')}</Radio>
				</Radio.Group>
			</div>
			<Divider />
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
				<Form.Item style={{ width: '40%' }} name='city'>
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
				{type === 'hotel' ? (
					<Form.Item name='datesHotels' style={{ width: '50%' }}>
						<RangePicker
							ranges={{
								[t('Today')]: [moment(), moment()],
								[t('One Week')]: [currentDate, futureWeek],
								[t('One Month')]: [currentDate, futureMonth],
							}}
							placeholder={[t('Drop off'), t('Pick up')]}
							placement='bottomLeft'
							className='form-item_bookinghomepage'
							format={lang === 'vi' ? 'DD-MM-YYYY' : null}
						/>
					</Form.Item>
				) : null}

				{type === 'grooming' ? (
					<Form.Item name='datesGrooming' style={{ width: '55%' }}>
						<DatePicker
							showTime={{
								format: 'HH:mm',
							}}
							placement='bottomLeft'
							format={
								lang === 'vi'
									? `HH:mm, DD-MM-YYYY`
									: 'HH:mm, YYYY-MM-DD '
							}
							className='form-item_bookinghomepage'
						/>
					</Form.Item>
				) : null}
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
		</div>
	);
};
export default FormBookingHomepage;
