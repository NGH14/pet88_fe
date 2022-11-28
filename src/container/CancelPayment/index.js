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
import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import FooterWave from '../../components/Footer';
import './style.css';

import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;
const description = 'This is a description.';
const { Header, Content, Footer } = Layout;

export default function PaymentCancel() {
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const fetchDeleteData = async () => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/order/${id}`,
			);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchDeleteData();
	}, []);

	const handleClick = () => {
		navigate(-3, { replace: true });
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
					<div className='cancel_payment-page'>
						<Steps current={1}>
							<Step title='Finished' description={description} />
							<Step
								title='In Progress'
								description={description}
								subTitle='Left 00:00:08'
							/>
							<Step title='Waiting' description={description} />
						</Steps>
						<Button onClick={() => handleClick()}>Back</Button>
					</div>
				</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}
