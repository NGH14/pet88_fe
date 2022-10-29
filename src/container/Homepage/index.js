import * as React from 'react';

import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';

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
import { HeartTwoTone } from '@ant-design/icons';

import viVN from 'antd/es/locale/vi_VN';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

import { Calendar } from '../../components/Calendar';
import GoogleAuthButton from '../../components/GoogleAuthButton/';
import { UserLanguage } from '../../context/LanguageContext';
import { momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import HeroImage from '../../components/HeroImageHomepage/index';
// translation catalog
import { Col, Divider, Row } from 'antd';

import { Layout } from 'antd';
import AppHeader from './../../components/Navbar/';
import SubNavBar from './../../components/SubNavBar/index';
import ScrollTrigger from 'react-scroll-trigger';
import FooterWave from './../../components/Footer/index';
import ListOfUser from '../../components/ListUser';
import { UserAuth } from '../../context/AuthContext';
import SwiperCore, { Autoplay, Pagination as swiperPagination } from 'swiper';
import 'swiper/css/autoplay';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';

import img1 from '../../assets/images/customer-logo-1.webp';
import img2 from '../../assets/images/customer-logo-2.webp';
import img3 from '../../assets/images/customer-logo-4.webp';
import img4 from '../../assets/images/customer-logo-2.webp';
import FIRST from '../../assets/images/dog-grooming-photography-2.jpg';
import SECOND from '../../assets/images/dog-grooming-photography-1.jpg';
import serviceImg1 from '../../assets/images/Illustration-Bond.png';
import serviceImg2 from '../../assets/images/Illustration-Schedule.png';

import 'react-before-after-slider-component/dist/build.css';
const { Header, Content, Footer } = Layout;
const style = {
	background: '#0092ff',
	padding: '8px 0',
};
// initialize i18next with catalog and language to use
SwiperCore.use([Autoplay]);

const FIRST_IMAGE = {
	imageUrl: FIRST,
};
const SECOND_IMAGE = {
	imageUrl: SECOND,
};

function Homepage() {
	const [countUp, setCountUp] = React.useState(false);
	const { token } = UserAuth();
	const [t, i18n] = useTranslation();
	const { lang, SetLanguage } = UserLanguage();

	React.useEffect(() => {
		document.title = `Pet88 - ${t('Pet Care Services')} `;
	});

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		SetLanguage(lng);
	};

	/* ... */

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
						<div className='wrap-content'>
							<p>{t('leading partner')}</p>
							<Swiper
								slidesPerView={4}
								spaceBetween={10}
								pagination={{
									clickable: true,
								}}
								speed={3000}
								modules={[Autoplay]}
								autoplay={{ delay: 1000 }}
								className='mySwiper'>
								<SwiperSlide>
									<img
										src={img1}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img2}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img3}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img4}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img1}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img2}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img3}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img4}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>{' '}
								<SwiperSlide>
									<img
										src={img1}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img2}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img3}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img4}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img1}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img2}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src={img3}
										alt=''
										className='swiper-logo'
									/>
								</SwiperSlide>
							</Swiper>
						</div>
						<div className='homepage-content_flex'>
							<div className='homepage-content_flexText'>
								<HeartTwoTone
									style={{ fontSize: 20, color: '#08c' }}
								/>
								<h3>
									{t(
										'Stay motivated and build better relationships',
									)}
								</h3>
								<p>dsadsasda</p>
							</div>
							<div>
								<img
									src={serviceImg1}
									alt=''
									className='homepage-content_flexImg'
								/>
							</div>
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
						</div>
					</div>
					<div>
						<p className='title-homepage'>
							{t('Service makes the difference')}
						</p>
						<div className='slider-beforeafter'>
							<div className='slider-contain'>
								<ReactBeforeSliderComponent
									currentPercentPosition='65'
									firstImage={FIRST_IMAGE}
									secondImage={SECOND_IMAGE}
								/>
							</div>
							<div className='slider-text'>
								<h2 className='slider-text_header'>
									"
									{t(
										'You take care of pets. We take care of you',
									)}
									."
								</h2>
								<p className='slider-text_span'>Pet88</p>
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
export default Homepage;
