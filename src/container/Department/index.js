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

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;

export default function Department() {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
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

	console.log(days);

	useEffect(() => {
		handleLoadData();
	}, []);

	const { lang } = UserLanguage();
	const { t } = useTranslation();

	const handleCheckout = async (room) => {
		await axios
			.post(
				`http://localhost:3001/api/checkout/create-checkout-session`,
				{
					email: user?.email,
					userID: user?.id,
					room: room,
					photo: photo,
					days: days,
				},
			)
			.then((response) => {
				console.log(response);
				window.location.href = response.data.url;
			})
			.catch((err) => console.log(err.message));
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
				<Layout className='departmentLayout'>
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
									{dataList?.map((room) => {
										return (
											<div>
												<p>{room.title}</p>
												<Button
													onClick={() =>
														handleCheckout(room)
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
