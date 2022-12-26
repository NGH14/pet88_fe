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
const { Header, Content, Footer } = Layout;

export default function PaymentSuccess() {
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/', { replace: true });
	};
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
									title={t('Your Booking')}
									description={t('Finish')}
								/>
							</Steps>
						</div>

						<div className='payment_status-page'>
							<BsCheck2Circle
								color='#4BB543'
								style={{
									fontSize: 100,
									marginBottom: 30,
								}}></BsCheck2Circle>
							<h1 style={{ fontWeight: 700 }}>
								{' '}
								{t('Booking Successful')}
							</h1>
							<span className='forgotpassword-subtext'>
								{t(
									'A Verification email has been sent to your email address',
								)}
								<br /> <br />
								{t(
									'If you have not received the email within a few minutes, please check your spam folder',
								)}
								.
							</span>

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
