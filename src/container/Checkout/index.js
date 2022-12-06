import {
	Avatar,
	Button,
	Card,
	ConfigProvider,
	Divider,
	Form,
	Input,
	Layout,
	Skeleton,
	Steps,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/vi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import FooterWave from '../../components/Footer';
import AppHeader from '../../components/Navbar';
import SubNavBar from '../../components/SubNavBar';
import { UserAuth } from '../../context/AuthContext';
import { UserLanguage } from '../../context/LanguageContext';
import { SearchData } from '../../context/SearchContext';
import './style.css';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

export default function Checkout() {
	const location = useLocation();
	const priceWithoutVAT = location.state.price;
	const VAT = (location.state.price * 8) / 100;
	const totalPrice = Number((priceWithoutVAT + VAT).toFixed(0));
	const sumPriceMap = location.state.priceList;

	const depart = location.state.depart;
	const { user } = UserAuth();
	const photo =
		location.state.photos?.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';

	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const { search } = SearchData();

	const onFinishUpdate = async (value) => {
		handleCheckout(value);
	};

	const handleCheckout = async (value) => {
		// console.log({
		// 	email: user?.email,
		// 	userID: user?.id,
		// 	roomList: sumPriceMap,
		// 	photo: photo,
		// 	days: search.days,
		// 	price: totalPrice,
		// 	start: search.datesHotels[0],
		// 	end: search.datesHotels[1],
		// 	...value,
		// });
		await axios
			.post(
				`http://localhost:3001/api/checkout/create-checkout-session`,
				{
					email: user?.email,
					userID: user?.id || 'guest',
					roomList: sumPriceMap,
					photo: photo,
					days: search.days,
					price: totalPrice,
					start: search.datesHotels[0],
					end: search.datesHotels[1],

					...value,
				},
			)
			.then((response) => {
				console.log(response.data);
				window.location.href = response.data.url;
			})
			.catch((err) => console.log(err.message));
	};

	moment.locale(lang);

	const checkInDate =
		search.datesHotels?.length > 0 && lang === 'vi'
			? moment(new Date(search.datesHotels[0]).getTime()).format(
					'ddd, DD MMMM YYYY',
			  )
			: moment(new Date(search.datesHotels[0]).getTime()).format(
					'ddd, MMM DD YYYY',
			  );

	const checkOutDate =
		search.datesHotels?.length > 0 && lang === 'vi'
			? moment(new Date(search.datesHotels[1]).getTime()).format(
					'ddd, DD MMMM YYYY',
			  )
			: moment(new Date(search.datesHotels[1]).getTime()).format(
					'ddd, MMM DD YYYY',
			  );

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<Layout className='departhtLayout'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<div className='checkout-page'>
						<div className='checkout_wrapper'>
							<div className='checkoutpage_step'>
								<Steps current={1} size='small'>
									<Step
										title={t('Your Selection')}
										description={t('Finish')}
									/>
									<Step
										title={t('Your Details')}
										description={t('In Progress')}
									/>
									<Step
										title={t('Your Payment')}
										description={t('Next')}
									/>
								</Steps>
							</div>
							<div className='checkoutpage_content'>
								<div className='checkoutpage_content-left'>
									<div className='checkout_toolbox'>
										<h2 className='toolbox_title'>
											{t('Your booking details')}
										</h2>
										<div className='checkout_date'>
											<div className='checkout_checkin'>
												<h3 className='checkout-sub'>
													{t('Check-in')}
												</h3>
												<p className='checkout-dates_text'>
													{checkInDate}
												</p>
											</div>

											<div className='checkout_checkout'>
												<h3 className='checkout-sub'>
													{t('Check-out')}
												</h3>
												<p className='checkout-dates_text'>
													{checkOutDate}
												</p>
											</div>
										</div>
										<Divider></Divider>
										<div className='checkout_days'>
											<h3 className='checkout_subtitle'>
												{t('Total length of pet stay')}
												{':'}
											</h3>
											<p className='checkout-dates_text'>{`${
												search.days
											} ${t('nights')}`}</p>
										</div>
									</div>

									<div className='checkout_toolbox'>
										<h2 className='toolbox_title'>
											{t('Your price summary')}
										</h2>
										<div className='checkout_price'>
											<div className='checkout_counting'>
												<h3 className='checkout-sub'>
													{t('Check-in')}
												</h3>
												<p className='checkout-dates_text'>
													{new Intl.NumberFormat(
														'vi-VI',
														{
															style: 'currency',
															currency: 'VND',
														},
													).format(priceWithoutVAT)}
												</p>
											</div>
											<div className='checkout_counting'>
												<h3 className='checkout-sub'>
													8% {t('VAT')}
												</h3>
												<p className='checkout-dates_text'>
													{new Intl.NumberFormat(
														'vi-VI',
														{
															style: 'currency',
															currency: 'VND',
														},
													).format(VAT)}
												</p>
											</div>
										</div>
										<Divider></Divider>
										<div className='checkout_counting'>
											<checkout_total>
												<h3 className='checkout_subtitle'>
													{t('Price')}
													{':'}
												</h3>
												<span className='checkout_subtitle'>
													{`(${t('For')} ${
														search.days
													} ${t('nights')})`}
												</span>
											</checkout_total>
											<p className='checkout-dates_text'>
												{new Intl.NumberFormat(
													'vi-VI',
													{
														style: 'currency',
														currency: 'VND',
													},
												).format(totalPrice)}
											</p>
										</div>
									</div>
								</div>

								<div className='checkoutpage_content-right'>
									<div className='checkout_toolbox'>
										<Card
											style={{
												width: '100%',
												border: 'none',
											}}>
											<Skeleton
												active
												loading={false}
												size='large'
												shape='round'
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
																depart.photos
																	.length > 0
																	? depart
																			.photos[0]
																	: ''
															}
														/>
													}
													title={
														<div>
															<h3 className='card-depart_tilte'>
																{t(depart.name)}
															</h3>
															<p className='card-depart_address'>
																{t(
																	depart.address,
																)}
																,{' '}
																{t(depart.city)}
															</p>
														</div>
													}></Meta>
											</Skeleton>
										</Card>
									</div>

									<div className='checkout_toolbox'>
										<Form
											validateTrigger='onBlur'
											labelCol={{ span: 4 }}
											name='update user'
											size={'large'}
											layout='vertical'
											initialValues={{
												name: user?.name,
												phone: user?.phone,

												email: user?.email,
											}}
											onFinish={onFinishUpdate}
											autoComplete='off'
											requiredMark={false}>
											<Form.Item
												label={t('Name')}
												name='name'
												rules={[
													{
														required: true,
														message: t(
															'Please input your username!',
														),
													},
												]}>
												<Input />
											</Form.Item>

											<Form.Item
												type='number'
												name='phone'
												label={t('Phone Number')}>
												<Input
													style={{
														width: '100%',
													}}
												/>
											</Form.Item>
											<Form.Item
												label='Email'
												name='email'>
												<Input />
											</Form.Item>
											<Form.Item
												style={{
													display: 'flex',
													justifyContent: 'flex-end',
												}}>
												<Button
													// loading={loading}
													style={{
														marginBlock: '0px auto',
														height: 'fit-content',
														fontSize: 16,
														lineHeight: 1.8,
														borderRadius: 5,
														boxShadow:
															'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
													}}
													type='primary'
													htmlType='submit'>
													{t('Confirm')}
												</Button>
											</Form.Item>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}
