import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';
import { CloseOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';

import AuthButton from './../GoogleAuthButton/';
import { useEffect } from 'react';
import ChangeLanguage from './../ChangeLanguage/';

import './style.css';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext';

function AppHeader() {
	const locate = useLocation();
	const navigate = useNavigate();

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

	const [navBg, setNavBg] = useState(false);

	const changeNavBg = () => {
		window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
	};

	const pages = [
		{ title: 'home', url: '/' },
		{ title: 'about', url: '/sign-in' },
		{ title: 'service', url: '/dsads' },
	];

	useEffect(() => {
		window.addEventListener('scroll', changeNavBg);
		return () => {
			window.removeEventListener('scroll', changeNavBg);
		};
	});

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
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
														<NavLink
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
														</NavLink>
													);
												})}
												{user && (
													<NavLink
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
													</NavLink>
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
												<NavLink to='/'>
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
												</NavLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<NavLink
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
														</NavLink>
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
														<NavLink
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
														</NavLink>
													);
												})}
												{user && (
													<NavLink
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
													</NavLink>
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
												<NavLink to='/'>
													<img
														src={Logo}
														alt=''
														style={{
															maxHeight: 30,
															transition:
																'all 0.3s ease-in-out',
														}}
													/>
												</NavLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<NavLink
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
														</NavLink>
													);
												})}
											</div>
										</div>

										<div className=''>
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
												{!visible && t('Logout')}
											</Button>
										</div>
									</div>
								</div>
							</div>
						);

					default:
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
														<NavLink
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
														</NavLink>
													);
												})}
												{user && (
													<NavLink
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
													</NavLink>
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
												<NavLink to='/'>
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
												</NavLink>
											</div>

											<div className='mobileHidden'>
												{pages.map((page, _) => {
													return (
														<NavLink
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
														</NavLink>
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
				}
			})()}
		</div>
	);
}

export default AppHeader;
