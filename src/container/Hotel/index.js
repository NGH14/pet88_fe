import React from 'react';
import ListHotel from './../../components/ListHotel/index';
import UploadFileHotel from './../../components/UploadFileHotel/index';
import { useLocation } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import SubNavBar from '../../components/SubNavBar';
import AppHeader from '../../components/Navbar';
import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import HeroImageHomePage from '../../components/HeroImageHomepage';
import './style.css';
import FooterWave from '../../components/Footer';
import { useTranslation } from 'react-i18next';
const { Header, Content, Footer } = Layout;

export default function Hotel() {
	const { state } = useLocation();
	const { lang } = UserLanguage();
	const { t } = useTranslation();
	console.log(state);
	return (
		<div>
			<ConfigProvider locale={lang === 'vi' && viVN}>
				<Layout className='mainLayout hotelLayout'>
					<Header>
						<SubNavBar></SubNavBar>
						<AppHeader></AppHeader>
					</Header>
					<Content>
						<HeroImageHomePage />
						<div className='hotel-page'>
							<div className='hotel-page_text'>
								<h1 className='hotel-page_title'></h1>
								<p>
									{t(
										'Fully update your information to work better on Pet88',
									)}
								</p>
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
