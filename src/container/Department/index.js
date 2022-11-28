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
	Table,
	DatePicker,
	Select,
	Breadcrumb,
	Space,
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
import moment from 'moment';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

export default function Department() {
	const location = useLocation();
	const id = location.pathname.split('/')[2];

	const { search, setSearchList } = SearchData();
	const photo =
		location.state.photos.length > 0
			? location.state.photos[0]
			: 'https://res.cloudinary.com/dggxjymsy/image/upload/v1667986972/pet88_upload/e10adb13acb1f3da8724a9149a58bd00_jwdh7h.jpg';

	const days = location.state.days;
	const [loading, setLoading] = useState(true);
	const [loadingTable, setLoadingTable] = useState(true);
	const [form] = Form.useForm();
	const [dataList, setDataList] = useState([]);
	const { user } = UserAuth();
	const navigate = useNavigate();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [sumPrice, setSumPrice] = useState(0);
	const [sumPriceMap, setSumPriceMap] = useState({});
	const [checkOutList, setcheckOutList] = useState([]);

	const currentDate = moment();
	const futureMonth = moment(currentDate).add(1, 'M');
	const futureWeek = moment(currentDate).add(1, 'W');
	const { lang } = UserLanguage();
	const { t } = useTranslation();

	useEffect(() => {
		handleLoadData();
	}, []);
	useEffect(() => {
		const sum = Object.keys(sumPriceMap)
			.map((k) => sumPriceMap[k])
			.reduce((sum, n) => sum + n, 0);

		setSumPrice(sum);

		Object.entries(sumPriceMap).forEach(([k, v]) => {
			if (v === 0) delete sumPriceMap[k];
		});
	}, [sumPriceMap]);

	const onFinish = async (values) => {
		setLoadingTable(true);
		await handleLoadData();
		setSearchList({
			...search,
			datesHotels: values.datesHotels || null,
		});
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

	const isAvailable = (roomNumber) => {
		const isFound = roomNumber.unavailableDates.some((date) =>
			alldates.includes(new Date(date).getTime()),
		);

		return !isFound;
	};

	const handleSelect = (e) => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms(
			checked
				? [...selectedRooms, value]
				: selectedRooms.filter((item) => item !== value),
		);
	};
	const handleCheckout = async () => {
		await axios
			.post(
				`http://localhost:3001/api/checkout/create-checkout-session`,
				{
					email: user?.email,
					userID: user?.id,
					roomList: sumPriceMap,
					photo: photo,
					days: search.days,
					price: sumPrice,
					start: search.datesHotels[0],
					end: search.datesHotels[1],
				},
			)
			.then((response) => {
				console.log(response.data);
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

	const handleChangeSelect = (id, val, name, type) => {
		setSumPriceMap((pre) => ({ ...pre, [id]: val }));
	};

	const handleLoadData = async () => {
		await axios
			.post(`http://localhost:3001/api/hotel/availability/${id}`, {
				dates: alldates,
			})
			.then((response) => {
				setDataList(response.data);
				setLoading(false);
				setLoadingTable(false);
			})
			.catch((err) => console.log(err.message));
	};

	const columns = [
		{
			title: t('Name'),
			dataIndex: 'title',
			sorter: (a, b) => a.title.length - b.title.length,
		},
		{
			title: `${t('Price for')} ${search.days} nights`,
			dataIndex: 'price',
			render: (price) => search.days * price,
		},
		{
			title: t('Room'),
			dataIndex: 'roomNumbers',
			render: (roomNumbers, record) => (
				<Select
					id={record._id}
					onChange={(e) => handleChangeSelect(record._id, e)}>
					<Select.Option value={0}>0</Select.Option>
					{roomNumbers.map((_room, index) => {
						return (
							<>
								<Select.Option
									key={record._id + `${index}`}
									value={
										record.price *
										search?.days *
										(index + 1)
									}>
									{index + 1}
								</Select.Option>
							</>
						);
					})}
				</Select>
			),
		},
	];

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
									<h2>{t('availability')}</h2>
									{sumPrice !== 0 ? (
										<h2>
											{new Intl.NumberFormat('vi-VI', {
												style: 'currency',
												currency: 'VND',
											}).format(sumPrice)}
										</h2>
									) : null}

									<NavLink to='/checkout'>
										{t('Reversion')}
									</NavLink>
									{/* <Button onClick={handleCheckout}>
										Check out
									</Button> */}
									<div className='department-page_roomcontent'>
										<Form
											form={form}
											requiredMark={false}
											name='form_bookingdepartpage'
											layout='horizontal'
											initialValues={{
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
											}}
											onValuesChange={onFinish}>
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
										</Form>{' '}
										{dataList.length > 0 && (
											<Table
												style={{
													backgroundColor: 'white',
													padding: 20,
													marginBlock: 10,
													borderRadius: 15,
													boxShadow:
														'rgb(153 196 227 / 25%) 0px 2px 8px',
												}}
												scroll={{
													x: 800,
												}}
												pagination={{
													defaultPageSize: 5,
													showSizeChanger: true,
													pageSizeOptions: [
														'5',
														'10',
														'20',
														'30',
													],
												}}
												columns={columns}
												dataSource={dataList}
												loading={loadingTable}
											/>
										)}
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
		</div>
	);
}
