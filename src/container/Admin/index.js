import React from 'react';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { collection, getDocs } from 'firebase/firestore';
import { storage } from '../../utils/firebase';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Space, Table, Tag, ConfigProvider, Button } from 'antd';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import logoWhite from '../../assets/images/logo-text.png';
import viVN from 'antd/es/locale/vi_VN';

import {
	ReconciliationOutlined,
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
import TableHotel from '../../components/TableHotel';
import { RiCalendarEventLine, RiCoupon3Line } from 'react-icons/ri';
import { MdOutlinePayments } from 'react-icons/md';
import { CgUserList } from 'react-icons/cg';
import { CalendarAdmin } from './../../components/Calendar';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

export default function Admin() {
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const { user } = UserAuth();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [openUpdate, setOpenUpdate] = useState(false);
	const { lang, SetLanguage } = UserLanguage();

	const items = [
		getItem(t('Calendar'), '/admin', <RiCalendarEventLine />),
		// getItem(
		// 	t('Department'),
		// 	'/admin/management-hotel',
		// 	<ReconciliationOutlined />,
		// ),
		getItem(
			t('Business'),
			'/admin/management-hotel',
			<ReconciliationOutlined />,
			[
				getItem(t('Departments'), '/admin/management-hotel'),
				getItem(t('Rooms'), '/admin/management-room'),
			],
		),
		getItem(t('User'), '/admin/management-user', <CgUserList />),
		getItem(
			t('Promotion'),
			'/admin/management-promotion',
			<RiCoupon3Line />,
		),

		getItem(t('Order'), '/admin/management-order', <MdOutlinePayments />),
	];

	useEffect(() => {
		if (!user?.role || user?.role !== 'admin') {
			navigate('/');
		}
		setLoading(false);
	}, [user]);
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
						<NavLink to='/admin'>
							<div className='logo_admin-container'>
								{collapsed ? (
									<img
										src={logoWhite}
										alt=''
										style={{
											height: 30,
											objectFit: 'cover',
										}}
									/>
								) : (
									<img
										src={logoWhite}
										alt=''
										style={{
											height: 40,
											objectFit: 'cover',
										}}
									/>
								)}
							</div>
						</NavLink>
						<Menu
							onClick={({ key }) => navigate(key)}
							theme='light'
							defaultSelectedKeys={['/admin']}
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
								padding: 0,
								margin: 'auto	',
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
										case '/admin':
											return <CalendarAdmin />;
										case '/admin/management-user':
											return <TableUser />;
										case '/admin/management-hotel':
											return <TableHotel />;
										case '/admin/management-promotion':
											return <TableHotel />;
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
