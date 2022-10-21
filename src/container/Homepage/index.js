import * as React from 'react';

import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';
import {
	Button,
	ConfigProvider,
	DatePicker,
	Modal,
	Pagination,
	Popconfirm,
	Radio,
	Select,
	Table,
	TimePicker,
	Transfer,
	Card,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import './style.css';

import { Calendar } from '../../components/Calendar';
import GoogleAuthButton from '../../components/GoogleAuthButton/';
import { UserLanguage } from '../../context/LanguageContext';
import { momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import HomeBanner from './../../components/HomeBanner/index';
import HeroImage from './../../components/HeroImage/index';
// translation catalog

import { Layout } from 'antd';
import AppHeader from './../../components/Navbar/';
import SubNavBar from './../../components/SubNavBar/index';
import ScrollTrigger from 'react-scroll-trigger';
import FooterWave from './../../components/Footer/index';
const { Header, Content, Footer } = Layout;

// initialize i18next with catalog and language to use

function Homepage() {
	const [countUp, setCountUp] = React.useState(false);

	const [data, setData] = React.useState(null);
	const [t, i18n] = useTranslation();
	const { lang, SetLanguage } = UserLanguage();

	React.useEffect(() => {
		document.title = `Pet88 - ${t('Pet Care Services')} `;
	});

	// React.useEffect(() => {
	// 	fetch('/api')
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		SetLanguage(lng);
	};

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<Layout className='mainLayout'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<HeroImage />
					<div className='white'>
						<div>
							<TimePicker />
							<Calendar></Calendar>
							<p>{!data ? 'Loading...' : data}</p>
							<p>{!data ? 'Loading...' : data}</p>
							<Card
								id='card'
								size='small'
								title='Small size card'
								extra={<a href='#'>More</a>}
								style={{ width: 300 }}>
								<p>Card content</p>
								<p>Card content</p>
								<p>Card content</p>
							</Card>
						</div>
					</div>
					<div className='grey'>
						<ScrollTrigger onEnter={() => setCountUp(true)}>
							{countUp && (
								<div className='countup-container'>
									<div className='countup-block'>
										<div className='countup-number'>
											<CountUp
												end={160}
												suffix='K+'
												duration={1.5}
											/>
										</div>
										<div className='countup-text'>
											<p>{t('hours of service')}</p>
										</div>
									</div>
									<div className='countup-block'>
										<div className='countup-number'>
											<CountUp
												end={969}
												suffix='K+'
												duration={1.5}
											/>
										</div>

										<div className='countup-text'>
											<p>{t('pets taken care of')}</p>{' '}
										</div>
									</div>
									<div className='countup-block'>
										<div className='countup-number'>
											<CountUp
												end={419}
												suffix='K+'
												duration={1.5}
											/>
										</div>
										<div className='countup-text'>
											<p>{t('happy pet parents')}</p>{' '}
										</div>
									</div>
								</div>
							)}
						</ScrollTrigger>
						<div>
							<TimePicker />
							<Calendar></Calendar>
							<p>{!data ? 'Loading...' : data}</p>
							<p>{!data ? 'Loading...' : data}</p>
							<Card
								id='card'
								size='small'
								title='Small size card'
								extra={<a href='#'>More</a>}
								style={{ width: 300 }}>
								<p>Card content</p>
								<p>Card content</p>
								<p>Card content</p>
							</Card>
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
export default Homepage;
