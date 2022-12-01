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
import { VscError } from 'react-icons/vsc';

import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

export default function PaymentCancel() {
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const fetchDeleteData = async () => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/order/cancel/${id}`,
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
						<div className='checkoutpage_step'>
							<Steps current={2} size='small' status='error'>
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
									description={t('Checkout Fail')}
								/>
							</Steps>
						</div>
						<div className='payment_status-page'>
							<VscError
								color='#FF4D4F'
								style={{
									fontSize: 100,
									marginBottom: 30,
								}}></VscError>
							<h1 style={{ fontWeight: 700 }}>
								{' '}
								{t('Oh no, your payment failed')}
							</h1>
							<p>
								{' '}
								{t(
									'Do not worry, please check the information',
								)}
							</p>

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
									backgroundColor: '#FF4D4F',
									borderColor: '#FF4D4F',
									borderRadius: 45,
									boxShadow:
										'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
								}}
								onClick={() => handleClick()}>
								{t('Go Back')}
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
