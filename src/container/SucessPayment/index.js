import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
	Card,
	ConfigProvider,
	Divider,
	Form,
	Layout,
	Skeleton,
	Button,
	Input,
	Table,
	DatePicker,
	Select,
	Breadcrumb,
	Space,
	Steps,
} from 'antd';
import { BsCheck2Circle } from 'react-icons/bs';

import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import FooterWave from '../../components/Footer';
import './style.css';

import logo from '../../assets/images/Group 1.png';

import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { SearchData } from '../../context/SearchContext';

const { Step } = Steps;
const description = 'This is a description.';
const { Header, Content, Footer } = Layout;

export default function PaymentSuccess() {
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { search } = SearchData();
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		fetchSuccess();
	}, []);

	console.log(dataList);
	const handleClick = () => {
		navigate(-3, { replace: true });
	};
	const fetchSuccess = async () => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/order/success/${id}`,
			);

			await handleUpdateDate(res.data);
			setDataList(res.data);
		} catch (error) {
			console.error(error);
		}
	};

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

	const handleUpdateDate = async (data) => {
		try {
			await Promise.all(
				data.products.map((room) => {
					const res = axios.put(
						`http://localhost:3001/api/hotel-room/availability/${room.roomId}`,
						{
							dates: alldates,
						},
					);
					return res.data;
				}),
			);
		} catch (err) {}
	};

	const location = useLocation();
	const id = location.pathname.split('/')[3];
	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<Layout className='departhtLayout'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<div className='success_payment-page'>
						<div className='checkoutpage_step'>
							<Steps current={3} size='small'>
								<Step
									title={t('Your Selection')}
									description={t('Finish')}
								/>
								<Step
									title={t('Your Details')}
									description={t('Finish')}
								/>
								<Step
									title={t('Your Payment')}
									description={t('Finish')}
								/>
							</Steps>
						</div>

						<div className='payment_status-page'>
							<BsCheck2Circle
								color='#4BB543'
								style={{
									fontSize: 50,
									marginBottom: 30,
								}}></BsCheck2Circle>
							<h1 style={{ fontWeight: 700 }}>
								{' '}
								{t('Payment Successfully')}
							</h1>
							<p> {t('Thank you for choosing Pet88')}</p>

							<div class='invoice-card'>
								<div class='invoice-title'>
									<img
										src={logo}
										alt=''
										style={{ height: 30 }}
									/>
									<div id='main-title'>
										<h4> PET88 {'INVOICE'}</h4>
										<span>
											{dataList.createdAt?.slice(0, 10)}
										</span>
									</div>

									<span id='date'>No #{dataList?._id}</span>
								</div>

								<div class='invoice-details'>
									<table class='invoice-table'>
										<thead>
											<tr>
												<td>{'ROOM'}</td>
												<td>{'NIGHT'}</td>

												<td>PRICE</td>
											</tr>
										</thead>

										<tbody>
											{dataList?.products?.map((data) => (
												<tr class='row-data'>
													<td>
														{data.roomNumber}{' '}
														<span>(large)</span>
													</td>
													<td id='unit'>
														{dataList.days}
													</td>
													<td>
														{' '}
														{new Intl.NumberFormat(
															'vi-VI',
															{
																style: 'currency',
																currency: 'VND',
															},
														).format(data.price)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div class='invoice-footer'>
									<td>{t('VAT')} (8%)</td>
									<td>
										{' '}
										{new Intl.NumberFormat('vi-VI', {
											style: 'currency',
											currency: 'VND',
										}).format((dataList?.price * 8) / 100)}
									</td>
								</div>

								<div class='invoice-footer'>
									<td>{t('Total')}</td>
									<td>
										{' '}
										{new Intl.NumberFormat('vi-VI', {
											style: 'currency',
											currency: 'VND',
										}).format(dataList?.price)}
									</td>
								</div>
							</div>

							<Button
								type='primary'
								htmlType='submit'
								style={{
									height: 'fit-content',
									width: '150px',
									fontSize: 16,
									lineHeight: 1.8,
									marginTop: 30,
									fontWeight: 700,
									backgroundColor: '#4BB543',
									borderColor: '#4BB543',
									borderRadius: 45,
									boxShadow:
										'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={() => handleClick()}>
								{t('Ok')}
							</Button>
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
