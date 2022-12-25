import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
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
import './style.css';

import viVN from 'antd/es/locale/vi_VN';
import { UserLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const { Header, Content } = Layout;

export default function PaymentSuccess() {
	const { lang } = UserLanguage();
	const { t } = useTranslation();

	return (
		<ConfigProvider locale={lang === 'vi' && viVN}>
			<Layout className='departhtLayout'>
				<Header>
					<SubNavBar></SubNavBar>
					<AppHeader></AppHeader>
				</Header>
				<Content>
					<div className='success_payment-page'>
						<div style={{ marginInline: '50px' }}>
							<div className='tac_title'>
								<div className='tac_title-heading'>
									<h2 className='tac_title-heading'>
										{t('Terms')} &amp; {t('Conditions')}
									</h2>
									<i
										style={{
											fontSize: '0.45em',
											color: '#999',
											opacity: '0.7',
										}}>
										16-12-2022
									</i>
								</div>
							</div>
							<div className='tac_content'>
								<h2 className='tac_content-heading'>
									1. {t('Introduction')}
								</h2>
								<p className='tac_content-text'>
									{t(
										'Thank you for utilizing the Pet88 platform, which is a web application for booking service in pet care',
									)}
								</p>
							</div>
							<div className='tac_content'>
								<h2 className='tac_content-heading'>
									2. {t('Who may use the Pet88')}
								</h2>
								<p className='tac_content-text'>
									{t(
										'The target users of Pet88 is pet ownner in Vietnam who want the new interactive UI',
									)}
								</p>
							</div>
							<div className='tac_content'>
								<h2 className='tac_content-heading'>
									3. {t('The services Pet88 provide')}
								</h2>
								<p className='tac_content-text'>
									{t(
										'The Service helps you to discover, view, and materialize the idea that helps improve the pet booking service in Vietnam',
									)}
								</p>
							</div>
							<div className='tac_content'>
								<h2 className='tac_content-heading'>
									4. {t('Information you share with Pet88')}
								</h2>
								<p className='tac_content-text'>
									{t(
										'We need specific information from you in order to provide you with our services',
									)}
								</p>
							</div>
							<div className='tac_content'>
								<h2 className='tac_content-heading'>
									5. {t('Pet88 uses your information to')}
								</h2>
								<p className='tac_content-text'>
									{t(
										'We use your information to authorize and authenticate your permission in Pet88, also used in the application UI to identify who you are.',
									)}
								</p>
							</div>
							<div className='tac_title'>
								<div className='tac_title-heading'>
									<i
										style={{
											fontSize: '0.45em',
											color: '#999',
											opacity: '0.7',
										}}>
										{t('Effective as of')} 16-12-2022
									</i>
								</div>
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		</ConfigProvider>
	);
}
