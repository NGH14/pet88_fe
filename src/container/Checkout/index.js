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

export default function Checkout() {
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
					<div className='checkout-page'>
						<Steps current={1}>
							<Step title='Finished' description={description} />
							<Step
								title='In Progress'
								description={description}
								subTitle='Left 00:00:08'
							/>
							<Step title='Waiting' description={description} />
						</Steps>
					</div>
				</Content>
				<Footer>
					<FooterWave></FooterWave>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}
