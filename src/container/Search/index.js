import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
	Card,
	ConfigProvider,
	Divider,
	Form,
	Layout,
	Skeleton,
	Button,
	Input,
	DatePicker,
	Select,
	Breadcrumb,
	Avatar,
	Typography,
	Empty,
} from 'antd';
import moment from 'moment';
import { RightOutlined } from '@ant-design/icons';

import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import FooterWave from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import departImg from '../../assets/images/e10adb13acb1f3da8724a9149a58bd00.jpg';
import './style.css';
import Column from 'antd/lib/table/Column';
import { SearchData } from '../../context/SearchContext';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

export default function Search() {
	const { state } = useLocation();
	const [loading, setLoading] = useState(true);
	const { search, setSearchList } = SearchData();
	const [searchState, setSearchState] = useState(true);

	const [type, setType] = useState(search?.services);
	const [form] = Form.useForm();
	const currentDate = moment();
	const futureMonth = moment(currentDate).add(1, 'M');
	const futureWeek = moment(currentDate).add(1, 'W');

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

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

	const alldates =
		search.datesHotels || search.datesHotels?.length > 0
			? getDatesInRange(search.datesHotels[0], search.datesHotels[1])
			: [];

	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const fetchHotelData = async (value) => {
		if (type === 'hotel') {
			try {
				const res = await axios.post(
					`http://localhost:3001/api/hotel/find-hotel-able`,
					{
						city: value.city,
						dates: alldates,
						services: value.services,
					},
				);

				return res.data;
			} catch (error) {
				console.error(error);
			}
		}

		if (type === 'grooming') {
			try {
				const res = await axios.post(
					`http://localhost:3001/api/hotel/find-grooming-able`,
					{
						city: value.city,
						services: value.services,
					},
				);

				return res.data;
			} catch (error) {
				console.error(error);
			}
		}
	};

	const onFinish = async (values) => {
		setLoading(true);
		const foundData = await fetchHotelData(values);
		setSearchList({
			foundData,
			services: type,
			city: values.city,
			foundNumber: foundData?.length,
			datesHotels: values.datesHotels || null,
			datesGrooming: values.datesGrooming || null,
		});
		setLoading(false);
	};

	return (
		<div>
			<ConfigProvider locale={lang === 'vi' && viVN}>
				<Layout className='hotelLayout'>
					<Header>
						<SubNavBar></SubNavBar>
						<AppHeader></AppHeader>
					</Header>
					<Content>
						<div className='hotel-page'>
							<div className='hotel-page_containner'>
								<div className='hotel-toolbox'>
									<div>
										<h4
											style={{
												textTransform: 'uppercase',
												fontWeight: 700,
												marginBottom: 15,
											}}>
											{t('search')}
										</h4>
										<Form
											form={form}
											requiredMark={false}
											name='form_bookingdepartpage'
											layout='vertical'
											initialValues={{
												city: search?.city,
												datesHotels:
													search.datesHotels && [
														moment(
															search
																?.datesHotels[0],
														),
														moment(
															search
																?.datesHotels[1],
														),
													],
												services: search?.services,
												datesGrooming:
													search.datesGrooming &&
													moment(
														search?.datesGrooming,
													),
											}}
											onFinish={onFinish}>
											<Form.Item
												name='services'
												label={t('Services')}>
												<Select
													onChange={(value) =>
														setType(value)
													}
													placeholder={t('Services')}>
													<Option value='hotel'>
														{t('Hotel')}
													</Option>
													<Option value='grooming'>
														{t('Grooming')}
													</Option>
												</Select>
											</Form.Item>
											<Form.Item
												name='city'
												placeholder={t('City name')}
												label={t('City name')}>
												<Select
													showSearch
													filterOption={(
														input,
														option,
													) =>
														(option?.value ?? '')
															.toLowerCase()
															.includes(
																input.toLowerCase(),
															)
													}
													className='form-item_bookingdepartpage'>
													<Option value='Ho Chi Minh'>
														{t('Ho Chi Minh')}
													</Option>
													<Option value='Ha Noi'>
														{t('Ha Noi')}
													</Option>
													<Option value='Da Nang'>
														{t('Da Nang')}
													</Option>
												</Select>
											</Form.Item>
											{type === 'hotel' ? (
												<Form.Item
													name='datesHotels'
													label={t('For these days')}>
													<RangePicker
														ranges={{
															[t('Today')]: [
																moment(),
																moment(),
															],
															[t('One Week')]: [
																currentDate,
																futureWeek,
															],
															[t('One Month')]: [
																currentDate,
																futureMonth,
															],
														}}
														placeholder={[
															t('Drop off'),
															t('Pick up'),
														]}
														placement='bottomLeft'
														className='form-item_bookingdepartpage'
														format={
															lang === 'vi'
																? 'DD-MM-YYYY'
																: null
														}
													/>
												</Form.Item>
											) : null}

											{type === 'grooming' ? (
												<Form.Item
													name='datesGrooming'
													label={t('Booking time')}>
													<DatePicker
														className='form-item_bookingdepartpage'
														showTime={{
															format: 'HH:mm',
														}}
														placement='bottomLeft'
														format={
															lang === 'vi'
																? `HH:mm, DD-MM-YYYY`
																: 'HH:mm, YYYY-MM-DD '
														}
													/>
												</Form.Item>
											) : null}
											<Form.Item
												shouldUpdate
												style={{ width: '100%' }}>
												<Button
													type='primary'
													block={true}
													className='form-button_bookingdepartpage'
													htmlType='submit'>
													{t('Search')}
												</Button>
											</Form.Item>
										</Form>{' '}
									</div>
								</div>
								<div className='hotel-page_content'>
									{!loading ? (
										<>
											<div className='hotel-breadcum'>
												<Breadcrumb separator='>'>
													<Breadcrumb.Item>
														<NavLink to='/'>
															{t('home')}
														</NavLink>
													</Breadcrumb.Item>
													<Breadcrumb.Item>
														{t('list search')}
													</Breadcrumb.Item>
												</Breadcrumb>
											</div>
											<h3 className='hotel-page_title'>
												<span className='hotel-page_titlelight'>
													{t('Available for')}{' '}
													<span className='hotel-page_title'>
														{' '}
														{t(type)}
													</span>{' '}
													{t('in')}{' '}
												</span>
												{t(search?.city)}
											</h3>
											<h3 className='hotel-page_subtitle'>
												{t('found')}{' '}
												{search?.foundNumber}{' '}
												{t('properties')}
											</h3>
											<Divider></Divider>
										</>
									) : (
										<Skeleton
											active
											shape='round'
											loading={loading}
											paragraph={{
												rows: 1,
											}}
										/>
									)}

									{!loading && search?.foundData
										? search?.foundData.map(
												(depart, index) => {
													return (
														<NavLink
															key={depart._id}
															to={`/department/${depart._id}`}
															state={{
																...depart,
															}}>
															<Card
																hoverable
																style={{
																	borderRadius: 15,
																	width: '100%',
																	marginTop: 16,
																	boxShadow:
																		'rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 2px 2px, rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 1px 1px, rgb(0 0 0 / 5%) 0px 2px 10px',
																}}>
																<Skeleton
																	active
																	size='large'
																	shape='round'
																	loading={
																		loading
																	}
																	avatar
																	paragraph={{
																		rows: 4,
																	}}>
																	<Meta
																		style={{
																			minHeight: 150,
																		}}
																		avatar={
																			<Avatar
																				className='card_avatar'
																				style={{
																					width: 300,
																					height: '100%',
																					objectFit:
																						'cover',
																					borderRadius: 15,
																				}}
																				shape='square'
																				src={
																					depart
																						.photos
																						.length >
																					0
																						? depart
																								.photos[0]
																						: departImg
																				}
																			/>
																		}
																		title={
																			<div>
																				<h3 className='card-depart_tilte'>
																					{t(
																						depart.name,
																					)}
																				</h3>
																				<p className='card-depart_address'>
																					{t(
																						depart.address,
																					)}

																					,{' '}
																					{t(
																						depart.city,
																					)}
																				</p>
																			</div>
																		}
																		description={
																			search?.days ? (
																				<div className='card-depart_desc'>
																					<Paragraph
																						ellipsis={{
																							rows: 4,
																						}}>
																						{t(
																							depart.desc,
																						)}
																					</Paragraph>
																					<p
																						style={{
																							textAlign:
																								'right',
																						}}>
																						~
																						{
																							search?.days
																						}
																					</p>
																				</div>
																			) : null
																		}></Meta>
																</Skeleton>
															</Card>
														</NavLink>
													);
												},
										  )
										: Array(4)
												.fill(null)
												.map(() => {
													return (
														<Card
															style={{
																borderRadius: 15,
																width: '100%',
																marginTop: 16,
															}}>
															<Skeleton
																active
																size='large'
																shape='round'
																loading={
																	loading
																}
																avatar
																paragraph={{
																	rows: 4,
																}}></Skeleton>
														</Card>
													);
												})}

									{search?.foundData?.length === 0 ? (
										<Empty></Empty>
									) : null}
								</div>
							</div>
						</div>
					</Content>
					<Footer>
						<FooterWave></FooterWave>
					</Footer>
				</Layout>
			</ConfigProvider>
		</div>
	);
}
