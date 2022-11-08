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
import { UserAuth } from '../../context/AuthContext';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;

export default function Department() {
	const { state } = useLocation();
	const [loading, setLoading] = useState(true);
	const [form] = Form.useForm();
	const { user } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	});
	const { lang } = UserLanguage();
	const { t } = useTranslation();

	const handleCheckout = () => {
		axios
			.post(`http://localhost:3001/create-checkout-session`, {
				email: user.email,
			})
			.then((response) => {
				// console.log(response);
				window.location.href = response.data.url;
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
								<Breadcrumb>
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
								<div className='department-toolbox'>
									{!loading ? (
										<div>
											<h4>{t('search')}</h4>
											<button
												onClick={() =>
													handleCheckout()
												}>
												Check out
											</button>
										</div>
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
