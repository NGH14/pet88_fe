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
} from 'antd';
import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import FooterWave from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import departImg from '../../assets/images/e10adb13acb1f3da8724a9149a58bd00.jpg';
import './style.css';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

export default function Hotel() {
	const { state } = useLocation();
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState(state);
	const [form] = Form.useForm();
	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	});
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
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};
	console.log(search);
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

	function dayDifference(date1, date2) {
		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return diffDays;
	}

	const onFinish = async (values) => {
		const foundData = await fetchHotelData(values);
		const foundNumber = await fetchHotelNumber(values);
		if (values.dates) {
			const days = dayDifference(
				values.dates[0].toDate(),
				values.dates[1].toDate(),
			);
			setSearch({ city: values.city, foundData, foundNumber, days });
		} else {
			setSearch({
				city: values.city,
				foundData,
				foundNumber,
				days: undefined,
			});
		}
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
							<div className='hotel-breadcum'>
								<Breadcrumb>
									<Breadcrumb.Item>
										<NavLink to='/'>{t('home')}</NavLink>
									</Breadcrumb.Item>
									<Breadcrumb.Item>
										{t('list search')}
									</Breadcrumb.Item>
								</Breadcrumb>
							</div>
							<div className='hotel-page_containner'>
								<div className='hotel-toolbox'>
									{!loading ? (
										<div>
											<h4>{t('search')}</h4>
											<Form
												size='large'
												form={form}
												requiredMark={false}
												name='form_bookinghomepage'
												initialValues={{
													city: 'Ho Chi Minh',
												}}
												onFinish={onFinish}>
												<Form.Item name='city'>
													<Select
														showSearch
														filterOption={(
															input,
															option,
														) =>
															(
																option?.value ??
																''
															)
																.toLowerCase()
																.includes(
																	input.toLowerCase(),
																)
														}
														className='form-item_bookinghomepage'>
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

												<Form.Item name='dates'>
													<RangePicker
														placeholder={[
															t('Drop off'),
															t('Pick up'),
														]}
														placement='bottomLeft'
														className='form-item_bookinghomepage'
														format={
															lang === 'vi'
																? 'DD-MM-YYYY'
																: null
														}
													/>
												</Form.Item>
												<Form.Item
													shouldUpdate
													style={{ width: '100%' }}>
													<Button
														type='primary'
														block={true}
														className='form-button_bookinghomepage'
														htmlType='submit'>
														{t('Search')}
													</Button>
												</Form.Item>
											</Form>{' '}
										</div>
									) : null}
								</div>
								<div className='hotel-page_content'>
									{!loading ? (
										<h3 className='hotel-page_title'>
											{t(search?.city)}: {t('found')}{' '}
											{search?.foundNumber}{' '}
											{t('properties')}
										</h3>
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
									<Divider></Divider>

									{!loading
										? search.foundData.map(
												(depart, index) => {
													console.log();
													return (
														<Card
															key={depart._id}
															hoverable
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
																}}>
																<Meta
																	avatar={
																		<Avatar
																			style={{
																				width: 120,
																				height: '100%',
																				objectFit:
																					'cover',
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
																		<NavLink
																			to={`/department/${depart._id}`}>
																			{t(
																				depart.name,
																			)}
																		</NavLink>
																	}
																	description={
																		<>
																			<Paragraph
																				ellipsis={{
																					rows: 3,
																				}}>
																				{t(
																					depart.desc,
																				)}
																			</Paragraph>
																			<Button>
																				asda
																			</Button>
																			<Button>
																				asda
																			</Button>
																		</>
																	}
																/>
															</Skeleton>
														</Card>
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
