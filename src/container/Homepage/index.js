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
import { HeartTwoTone, LikeTwoTone } from '@ant-design/icons';

import viVN from 'antd/es/locale/vi_VN';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

import { UserLanguage } from '../../context/LanguageContext';

import HeroImage from '../../components/HeroImageHomepage/index';
import { Layout } from 'antd';
import AppHeader from './../../components/Navbar/';
import SubNavBar from './../../components/SubNavBar/index';
import ScrollTrigger from 'react-scroll-trigger';
import FooterWave from './../../components/Footer/index';
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

import 'react-before-after-slider-component/dist/build.css';
import 'antd/es/date-picker/style/index.css';
import 'antd/es/input/style/index.css';

const { Header, Content, Footer } = Layout;

SwiperCore.use([Autoplay]);

const FIRST_IMAGE = {
	imageUrl: FIRST,
};
const SECOND_IMAGE = {
	imageUrl: SECOND,
};

const cardVariants = {
	offscreen: {
		y: 150,
	},
	onscreen: {
		y: 0,
		transition: {
			type: 'spring',
			bounce: 0.4,
			duration: 0.5,
		},
	},
};

function Homepage() {
	const [countUp, setCountUp] = React.useState(false);
	const [t] = useTranslation();
	const { lang } = UserLanguage();

	React.useEffect(() => {
		document.title = `Pet88 - ${t('Pet Care Services')} `;
	});

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<Layout className='mainLayout'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<HeroImage />
					<div className='homepage_whitebackground'>
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
								<h3 className='homepage-content_title'>
									{t(
										'Stay motivated and build better relationships',
									)}
								</h3>
								<p>
									{t(
										'Healthy work relationships necessitate clear, consistent, honest, and open communication, which is the foundation of trust, without which no relationship can thrive',
									)}
								</p>
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
						<div
							className='homepage-servicecontent'
							variants={cardVariants}>
							<h3 className='homepage-servicecontent_title'>
								{t('One platform, everything pet service')}
							</h3>
							<p>
								{t(
									'Pet88 is dedicated to providing the best quality care for your pet. We offer the service, depending on your needs. We strive to be the most dependable	and accessible service in Vietnam and will go the extra distance to give you precisely what you are looking for in pet care',
								)}
							</p>
						</div>
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
					</div>
					<motion.div
						initial='offscreen'
						whileInView='onscreen'
						viewport={{ once: true, amount: 0.8 }}>
						<p className='title-homepage'>
							{t('Service makes the difference')}
						</p>
						<motion.div
							className='slider-beforeafter'
							variants={cardVariants}>
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
						</motion.div>
					</motion.div>
				</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}
export default Homepage;
