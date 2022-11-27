import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
} from 'antd';
import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import FooterWave from '../../components/Footer';
import { useTranslation } from 'react-i18next';

import './style.css';
import axios from 'axios';
import departImg from '../../assets/images/e10adb13acb1f3da8724a9149a58bd00.jpg';

import { UserAuth } from '../../context/AuthContext';
import { async } from '@firebase/util';
import { SearchData } from '../../context/SearchContext';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;

export default function Department() {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const handleSelect = (e) => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms(
			checked
				? [...selectedRooms, value]
				: selectedRooms.filter((item) => item !== value),
		);
	};
	const { search, setSearchList } = SearchData();
	const photo =
		location.state.photos.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';

	const days = location.state.days;
	const [loading, setLoading] = useState(true);
	const [form] = Form.useForm();
	const [dataList, setDataList] = useState([]);
	const { user } = UserAuth();
	const navigate = useNavigate();
	const [selectedRooms, setSelectedRooms] = useState([]);

	useEffect(() => {
		handleLoadData();
	}, []);

	const { lang } = UserLanguage();
	const { t } = useTranslation();

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

	const alldates = getDatesInRange(
		search.datesHotels[0],
		search.datesHotels[1],
	);

	const isAvailable = (roomNumber) => {
		console.log(roomNumber);
		const isFound = roomNumber.unavailableDates.some((date) =>
			alldates.includes(new Date(date).getTime()),
		);

		return !isFound;
	};

	const handleCheckout = async (room) => {
		await axios
			.post(
				`http://localhost:3001/api/checkout/create-checkout-session`,
				{
					email: user?.email,
					userID: user?.id,
					room: room,
					photo: photo,
					days: search.days,
				},
			)
			.then((response) => {
				console.log(response);
				window.location.href = response.data.url;
			})
			.catch((err) => console.log(err.message));
	};

	const handleClick = async () => {
		try {
			await Promise.all(
				selectedRooms.map((roomId) => {
					const res = axios.put(
						`http://localhost:3001/api/hotel-room/availability/${roomId}`,
						{
							dates: alldates,
						},
					);
					return res.data;
				}),
			);
		} catch (err) {}
	};

	const handleLoadData = async (departID) => {
		await axios
			.get(`http://localhost:3001/api/hotel/room/${id}`)
			.then((response) => {
				setDataList(response.data);
				setLoading(false);
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<div>
			<ConfigProvider locale={lang === 'vi' && viVN}>
				<Layout className='departhtLayout'>
					<Header>
						<SubNavBar></SubNavBar>
						<AppHeader></AppHeader>
					</Header>
					<Content>
						<div className='department-page'>
							<div className='department-breadcum'>
								<Breadcrumb separator='>'>
									<Breadcrumb.Item>
										<NavLink to='/'>{t('home')}</NavLink>
									</Breadcrumb.Item>
									<Breadcrumb.Item>
										<NavLink to={-1}>
											{t('list search')}
										</NavLink>
									</Breadcrumb.Item>
									<Breadcrumb.Item>
										{t('result')}
									</Breadcrumb.Item>
								</Breadcrumb>
							</div>
							<div className='department-page_containner'>
								<div className='department-listroom'>
									<img src={photo} alt='' />
									{dataList?.map((room) => {
										return (
											<div>
												<p>{room.title},</p>
												{room.roomNumbers?.map(
													(roomNumber) => {
														return (
															<>
																<label>
																	{
																		roomNumber.number
																	}
																</label>
																<input
																	type='checkbox'
																	value={
																		roomNumber._id
																	}
																	onChange={
																		handleSelect
																	}
																	disabled={
																		!isAvailable(
																			roomNumber,
																		)
																	}
																/>
															</>
														);
													},
												)}

												{/* <Button
													onClick={
														// handleCheckout(room)
														handleClick
													}>
													Check out
												</Button> */}
												<Button
													onClick={
														() =>
															handleCheckout(room)
														// handleClick
													}>
													Check out
												</Button>
											</div>
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
