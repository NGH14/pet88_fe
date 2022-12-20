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
import { SearchData } from '../../context/SearchContext';
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
	const { search, setSearchList } = SearchData();

	const getDatesInRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const date = new Date(start.getTime());
		const dates = [];
		while (date <= end) {
			dates.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}
		return dates;
	};

	const fetchHotelData = async (value) => {
		const city = value?.city || search?.city;

		const alldates =
			value.datesHotels || value.datesHotels?.length > 0
				? getDatesInRange(value.datesHotels[0], value.datesHotels[1])
				: [];
		try {
			const res = await axios.post(
				`http://localhost:3001/api/hotel/find-hotel-able`,
				{
					city: city,
					dates: alldates,
					services: type,
				},
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	const onFinish = async (values) => {
		const foundData = await fetchHotelData(values);
		setSearchList({
			services: type,
			city: values.city,
			foundData,
			foundNumber: foundData?.length,
			datesHotels: values.datesHotels || null,
			datesGrooming: values.datesGrooming || null,
		});

		navigate('/search');
	};
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < moment().endOf('day');
	};

	return (
		<div className='form_bookingservice'>
			<div
				style={{
					display: 'flex',
					gap: 15,
					alignItems: 'center',
					justifyContent: 'space-between',
					fontWeight: 'bold',
					fontSize: 16,
					backgroundColor: 'rgb(244, 245, 246)',
					padding: 20,
					borderRadius: 15,
					marginBlock: '10px 20px',
					flexWrap: 'wrap',
				}}>
				<span>{t("I'm looking for service")}:</span>
				<Radio.Group
					style={{
						display: 'flex',
						gap: 15,
						textTransform: 'capitalize',
					}}
					defaultValue='hotel'
					size='large'
					onChange={(e) => setType(e.target.value)}>
					<Radio className='radio_formType' value='hotel'>
						{t('hotel')}
					</Radio>
					<Radio value='grooming'>{t('grooming')}</Radio>
				</Radio.Group>
			</div>
			<Form
				className='form_bookinghomepage'
				size='large'
				form={form}
				requiredMark={false}
				name='form_bookinghomepage'
				initialValues={{}}
				layout='vertical'
				onFinish={onFinish}>
				<Form.Item
					className='form-item_bookinghomepage form-item_bookinghomepage_city'
					name='city'
					label={t('City name')}
					rules={[
						{
							required: true,
							message: t('Please enter the location'),
						},
					]}>
					<Select
						placeholder={t('City name')}
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
					<Form.Item
						className='form-item_bookinghomepage_others form-item_datepicker'
						name='datesHotels'
						label={t('For these days')}>
						<RangePicker
							ranges={{
								[t('Today')]: [moment(), moment()],
								[t('One Week')]: [currentDate, futureWeek],
								[t('One Month')]: [currentDate, futureMonth],
							}}
							placeholder={[t('Drop off'), t('Pick up')]}
							placement='bottomRight'
							className='form-item_bookinghomepage'
							format={lang === 'vi' ? 'DD-MM-YYYY' : null}
						/>
					</Form.Item>
				) : null}

				{type === 'grooming' ? (
					<Form.Item
						className='form-item_bookinghomepage_others form-item_datepicker'
						name='datesGrooming'
						label={t('Booking time')}>
						<DatePicker
							disabledDate={disabledDate}
							style={{ width: '100%' }}
							showTime={{
								format: 'HH:mm A',
							}}
							minuteStep={15}
							use12Hours
							placement='bottomLeft'
							format={
								lang === 'vi'
									? `HH:mm A, DD-MM-YYYY`
									: 'HH:mm A, YYYY-MM-DD '
							}
							className='form-item_bookinghomepage booking_grooming'
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
