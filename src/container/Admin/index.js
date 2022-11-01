import React from 'react';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { collection, getDocs } from 'firebase/firestore';
import { storage } from '../../utils/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Space, Table, Tag, ConfigProvider, Button } from 'antd';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import logoWhite from '../../assets/images/logo-text.png';
import viVN from 'antd/es/locale/vi_VN';

import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';

import './style.css';
import SubNavBar from './../../components/SubNavBar/index';
import { UserLanguage } from '../../context/LanguageContext';
import TableUser from './../../components/TableUser/index';
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem('Option 1', '/admin/', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', '/admin/management-user', <UserOutlined />),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem('Files', '9', <FileOutlined />),
];

export default function Admin() {
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const { user } = UserAuth();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [openUpdate, setOpenUpdate] = useState(false);
	const { lang, SetLanguage } = UserLanguage();

	useEffect(() => {
		if (!user?.role || user?.role !== 'admin') {
			navigate('/');
		}
		setLoading(false);
	}, [user]);
	console.log(location.pathname);
	return loading ? (
		<LoadingSpinner />
	) : (
		<>
			<ConfigProvider locale={lang === 'vi' && viVN}>
				<Layout
					style={{
						minHeight: '100vh',
					}}>
					<Sider collapsed={collapsed}>
						<div className='logo_admin-container'>
							{collapsed ? (
								<img
									src={logoWhite}
									alt=''
									style={{ height: 30, objectFit: 'cover' }}
								/>
							) : (
								<img
									src={logoWhite}
									alt=''
									style={{ height: 30, objectFit: 'cover' }}
								/>
							)}
						</div>
						<Menu
							onClick={({ key }) => navigate(key)}
							theme='light'
							defaultSelectedKeys={['1']}
							mode='inline'
							items={items}
						/>
					</Sider>
					<Layout className='adminsite-layout'>
						<Header
							className='adminsite-layout-background'
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								// maxWidth: 1350,
								padding: 0,
								margin: 'auto 10px auto 15px',
							}}>
							<Button
								style={{ backgroundColor: 'white' }}
								ghost
								type='text'
								className='trigger'
								onClick={() => setCollapsed(!collapsed)}>
								{collapsed ? (
									<MenuUnfoldOutlined></MenuUnfoldOutlined>
								) : (
									<MenuFoldOutlined></MenuFoldOutlined>
								)}
							</Button>
							<SubNavBar></SubNavBar>
						</Header>
						<Content
							style={{
								padding: '0 16px',
								backgroundColor: '#F7F8FA',
							}}>
							<div
								className='site-layout-background'
								style={{
									padding: 24,
									minHeight: 360,
								}}>
								{' '}
								{(() => {
									switch (location.pathname) {
										case '/admin/management-user':
											return <TableUser />;

										case '/sign-up':
										// return <SignUpForm />;
										case '/forgot-password':
										// return <ForgotPasswordForm />;
										default:
											return null;
									}
								})()}
							</div>
						</Content>
					</Layout>
				</Layout>
			</ConfigProvider>
		</>
	);
}
