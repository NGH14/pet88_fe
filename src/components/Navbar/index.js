import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';
import { CloseOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';

import AuthButton from './../GoogleAuthButton/';
import { useEffect } from 'react';
import ChangeLanguage from './../ChangeLanguage/';
import useScrollPosition from './../../hooks/useScrollPosition';
import { HashLink } from 'react-router-hash-link';

import './style.css';
import {
	Link,
	Navigate,
	NavLink,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext';

const pages = [
	{ title: 'home', url: '/#top' },
	{ title: 'about', url: '/#about_section' },
	{ title: 'service', url: '/#service_section' },
];

function AppHeader() {
	const locate = useLocation();
	const navigate = useNavigate();
	const scrollPosition = useScrollPosition();
	const [navBg, setNavBg] = useState(false);

	const { user, SignOut } = UserAuth();
	const [visible, setVisible] = useState(false);
	const { t } = useTranslation();

	const handleSignOut = async (e) => {
		e.preventDefault();
		try {
			await SignOut();
			navigate('/sign-in');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		!scrollPosition > 0 ? setNavBg(false) : setNavBg(true);
	}, [scrollPosition]);

	const showDrawer = () => {
		document.body.style.overflow = 'hidden !important';
		setVisible(true);
	};

	const onClose = () => {
		document.body.style.overflow = 'unset';
		setVisible(false);
	};

	return (
		<div>
			{(() => {
				switch (locate.pathname) {
					case '/':
						return (
							<div
								style={
									navBg
										? {
												backgroundColor: '#fff',
										  }
										: {}
								}>
								<div className='container-fluid'>
									<div className='header'>
										<div className='mobileVisible'>
											<Button
												onClick={showDrawer}
												type='text'
												icon={
													<MenuOutlined
														style={{
															transition:
																'color 0.5s ease-in-out',
															color: navBg
																? 'black'
																: 'white',
														}}
													/>
												}
												ghost></Button>
											<Drawer
												footer={
													<ChangeLanguage
														fullWidth
														TextColor={
															visible || navBg
																? 'black'
																: 'white'
														}></ChangeLanguage>
												}
												width={300}
												className='pet88-menu'
												placement='left'
												onClose={onClose}
												closeIcon={<CloseOutlined />}
												open={visible}
												bodyStyle={{
													padding: '0',
													background: 'transparent',
												}}
												headerStyle={{
													border: 'none',
													paddingLeft: 10,
												}}>
												<p
													style={{
														transition:
															'color 0.3s ease-in-out',

														color:
															visible || navBg
																? 'black'
																: 'white',
														fontFamily:
															'Nunito Sans',
														textTransform:
															'uppercase',
														fontWeight: 700,
														fontSize: 16,
														borderTop:
															'1px solid black',
														margin: 0,
													}}>
													{' '}
												</p>

												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to='#about'
															// to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color:
																	visible ||
																	navBg
																		? 'black'
																		: 'white',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																padding: 15,
																borderBottom:
																	'1px solid black',
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
												{user && (
													<HashLink
														smooth
														to='./account'
														style={{
															transition:
																'color 0.3s ease-in-out',

															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															textTransform:
																'uppercase',
															fontWeight: 700,
															fontSize: 16,
															padding: 15,
															borderBottom:
																'1px solid black',
														}}>
														{t('account')}
													</HashLink>
												)}

												{user?.role === 'admin' && (
													<HashLink
														smooth
														to='/admin'
														style={{
															transition:
																'color 0.3s ease-in-out',

															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															textTransform:
																'uppercase',
															fontWeight: 700,
															fontSize: 16,
															padding: 15,
															borderBottom:
																'1px solid black',
														}}>
														{t('Admin Centre')}
													</HashLink>
												)}

												<div className='drawer-auth'>
													<AuthButton
														TextColor={
															visible
																? 'black'
																: 'white'
														}
														FullWitdh={
															visible
																? true
																: false
														}
													/>
												</div>
											</Drawer>
										</div>
										<div className='flexleft'>
											<div className='logo'>
												<HashLink to='/' smooth>
													<img
														src={
															navBg
																? Logo
																: LogoWhite
														}
														alt=''
														style={{
															maxHeight: 30,
															transition:
																'all 0.3s ease-in-out',
														}}
													/>
												</HashLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color:
																	visible ||
																	navBg
																		? 'black'
																		: 'white',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																marginInline: 10,
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
											</div>
										</div>

										<div className='mobileHidden'>
											<AuthButton
												TextColor={
													visible || navBg
														? 'black'
														: 'white'
												}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					case '/account':
						return (
							<div
								style={{
									backgroundColor: '#fff',
									transition:
										'background-color 0.5s ease-in-out',
								}}>
								<div className='container-fluid'>
									<div className='header'>
										<div className='mobileVisible'>
											<Button
												onClick={showDrawer}
												type='text'
												icon={
													<MenuOutlined
														style={{
															transition:
																'color 0.5s ease-in-out',
															color: 'black',
														}}
													/>
												}
												ghost></Button>
											<Drawer
												footer={
													<ChangeLanguage
														fullWidth
														TextColor={
															'black'
														}></ChangeLanguage>
												}
												width={300}
												className='pet88-menu'
												placement='left'
												onClose={onClose}
												closeIcon={<CloseOutlined />}
												open={visible}
												bodyStyle={{
													padding: '0',
													background: 'transparent',
												}}
												headerStyle={{
													border: 'none',
													paddingLeft: 10,
												}}>
												<p
													style={{
														transition:
															'color 0.3s ease-in-out',

														color:
															visible || navBg
																? 'black'
																: 'white',
														fontFamily:
															'Nunito Sans',
														textTransform:
															'uppercase',
														fontWeight: 700,
														fontSize: 16,
														borderTop:
															'1px solid black',
														margin: 0,
													}}>
													{' '}
												</p>

												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color:
																	visible ||
																	navBg
																		? 'black'
																		: 'white',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																padding: 15,
																borderBottom:
																	'1px solid black',
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
												{user && (
													<HashLink
														smooth
														to='/account'
														style={{
															transition:
																'color 0.3s ease-in-out',

															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															textTransform:
																'uppercase',
															fontWeight: 700,
															fontSize: 16,
															padding: 15,
															borderBottom:
																'1px solid black',
														}}>
														{t('account')}
													</HashLink>
												)}

												{user?.role === 'admin' && (
													<HashLink
														smooth
														to='/admin'
														style={{
															transition:
																'color 0.3s ease-in-out',

															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															textTransform:
																'uppercase',
															fontWeight: 700,
															fontSize: 16,
															padding: 15,
															borderBottom:
																'1px solid black',
														}}>
														{t('Admin Centre')}
													</HashLink>
												)}

												<div className='drawer-auth'>
													<AuthButton
														TextColor={
															visible
																? 'black'
																: 'white'
														}
														FullWitdh={
															visible
																? true
																: false
														}
													/>
												</div>
											</Drawer>
										</div>
										<div className='flexleft'>
											<div className='logo'>
												<HashLink to='/' smooth>
													<img
														src={Logo}
														alt=''
														style={{
															maxHeight: 30,
															transition:
																'all 0.3s ease-in-out',
														}}
													/>
												</HashLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color: 'black',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																marginInline: 10,
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
											</div>
										</div>
										<div className='mobileHidden'>
											<Button
												style={{ fontWeight: '700' }}
												type='text'
												onClick={(e) =>
													handleSignOut(e)
												}
												icon={
													<LogoutOutlined
														style={{
															fontWeight: '700',
														}}
													/>
												}>
												{t('Logout')}
											</Button>
										</div>

										<div className='mobileVisible'>
											<Button
												style={{ fontWeight: '700' }}
												type='text'
												onClick={(e) =>
													handleSignOut(e)
												}
												icon={
													<LogoutOutlined
														style={{
															fontWeight: '700',
														}}
													/>
												}></Button>
										</div>
									</div>
								</div>
							</div>
						);

					default:
						return (
							<div
								style={{
									backgroundColor: '#fff',
									transition:
										'background-color 0.5s ease-in-out',
								}}>
								<div className='container-fluid'>
									<div className='header'>
										<div className='mobileVisible'>
											<Button
												onClick={showDrawer}
												type='text'
												icon={
													<MenuOutlined
														style={{
															transition:
																'color 0.5s ease-in-out',
															color: 'black',
														}}
													/>
												}
												ghost></Button>
											<Drawer
												footer={
													<ChangeLanguage
														fullWidth
														TextColor={
															'black'
														}></ChangeLanguage>
												}
												width={300}
												className='pet88-menu'
												placement='left'
												onClose={onClose}
												closeIcon={<CloseOutlined />}
												open={visible}
												bodyStyle={{
													padding: '0',
													background: 'transparent',
												}}
												headerStyle={{
													border: 'none',
													paddingLeft: 10,
												}}>
												<p
													style={{
														transition:
															'color 0.3s ease-in-out',

														color:
															visible || navBg
																? 'black'
																: 'white',
														fontFamily:
															'Nunito Sans',
														textTransform:
															'uppercase',
														fontWeight: 700,
														fontSize: 16,
														borderTop:
															'1px solid black',
														margin: 0,
													}}>
													{' '}
												</p>

												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color:
																	visible ||
																	navBg
																		? 'black'
																		: 'white',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																padding: 15,
																borderBottom:
																	'1px solid black',
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
												{user && (
													<HashLink
														smooth
														to='/account'
														style={{
															transition:
																'color 0.3s ease-in-out',

															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															textTransform:
																'uppercase',
															fontWeight: 700,
															fontSize: 16,
															padding: 15,
															borderBottom:
																'1px solid black',
														}}>
														{t('account')}
													</HashLink>
												)}

												<div className='drawer-auth'>
													<AuthButton
														TextColor={
															visible
																? 'black'
																: 'white'
														}
														FullWitdh={
															visible
																? true
																: false
														}
													/>
												</div>
											</Drawer>
										</div>
										<div className='flexleft'>
											<div className='logo'>
												<HashLink to='/' smooth>
													<img
														src={Logo}
														alt=''
														style={{
															maxHeight: 30,
															transition:
																'all 0.3s ease-in-out',
														}}
													/>
												</HashLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<HashLink
															smooth
															key={page.title}
															to={page.url}
															style={{
																transition:
																	'color 0.3s ease-in-out',

																color: 'black',
																fontFamily:
																	'Nunito Sans',
																textTransform:
																	'uppercase',
																fontWeight: 700,
																fontSize: 16,
																marginInline: 10,
															}}>
															{t(page.title)}
														</HashLink>
													);
												})}
											</div>
										</div>
										<div className='mobileHidden'>
											<AuthButton TextColor={'black'} />
										</div>
									</div>
								</div>
							</div>
						);
				}
			})()}
		</div>
	);
}

export default AppHeader;
