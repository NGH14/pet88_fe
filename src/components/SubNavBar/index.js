import React, { useState } from 'react';
import { Avatar, Image } from 'antd';

import { Anchor, Drawer, Button, Dropdown, Menu } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { useEffect } from 'react';
import ChangeLanguage from '../ChangeLanguage/index';
import './style.css';
import AuthButton from './../GoogleAuthButton/index';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

function SubNavBar() {
	const locate = useLocation();
	const navigate = useNavigate();
	const { user, SignOut } = UserAuth();
	const [visible, setVisible] = useState(false);
	const { t } = useTranslation();
	const [navBg, setNavBg] = useState(false);

	const changeNavBg = () => {
		window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
	};

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

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: <NavLink to='/account'>{t('Account')}</NavLink>,
				},
				{
					key: '2',
					label: (
						<span onClick={(e) => handleSignOut(e)}>
							{t('Logout')}
						</span>
					),
				},
			]}
		/>
	);

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
								<div className='subheader mobileHidden'>
									<div
										className={
											user?.role === 'admin'
												? 'subheader-between'
												: 'subheader-right'
										}>
										{user?.role === 'admin' && (
											<NavLink
												to='/admin'
												style={{
													transition:
														'color 0.5s ease-in-out',
													color:
														visible || navBg
															? 'black'
															: 'white',
													fontFamily: 'Nunito Sans',
													cursor: 'pointer',
													fontSize: 11,
													margin: 0,
													padding: '0 10px',
												}}>
												{t('Admin Centre')}
											</NavLink>
										)}
										<div className='flex-right_subnavbar'>
											<ChangeLanguage
												TextColor={
													visible || navBg
														? 'black'
														: 'white'
												}
											/>

											{(user?.name ||
												localStorage.getItem(
													'name',
												)) && (
												<Dropdown
													overlay={menu}
													onClick={(e) =>
														e?.stopPropagation()
													}
													placement='bottomLeft'>
													<NavLink
														to='/account'
														style={{
															transition:
																'color 0.5s ease-in-out',
															color:
																visible || navBg
																	? 'black'
																	: 'white',
															fontFamily:
																'Nunito Sans',
															cursor: 'pointer',
															fontWeight: 700,
															fontSize: 11,
															margin: 0,
															padding: '0 10px',
														}}>
														{user?.photoURL ? (
															<Avatar
																referrerpolicy='no-referrer'
																referrerPolicy='no-referrer'
																src={
																	<Image
																		referrerpolicy='no-referrer'
																		referrerPolicy='no-referrer'
																		src={
																			user?.photoURL ||
																			localStorage.getItem(
																				'photo',
																			)
																		}
																	/>
																}
																style={{
																	width: 20,
																	height: 20,
																	margin: '0 5px',
																}}
															/>
														) : (
															<Avatar
																referrerPolicy='no-referrer'
																size={20}
																style={{
																	backgroundColor:
																		'rgb(249,107,24)',
																	margin: '0 5px',
																}}
																icon={
																	<UserOutlined />
																}
															/>
														)}{' '}
														{localStorage.getItem(
															'name',
														) || ` ${user?.name}`}
													</NavLink>
												</Dropdown>
											)}
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
								<div className='subheader mobileHidden '>
									<div
										className={
											user?.role === 'admin'
												? 'subheader-between'
												: 'subheader-right'
										}>
										{user?.role === 'admin' && (
											<NavLink
												to='/admin'
												style={{
													transition:
														'color 0.5s ease-in-out',
													color: 'black',
													fontFamily: 'Nunito Sans',
													cursor: 'pointer',
													fontSize: 11,
													margin: 0,
													padding: '0 10px',
												}}>
												{t('Admin Centre')}
											</NavLink>
										)}

										<ChangeLanguage
											TextColor={
												'black'
											}></ChangeLanguage>
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
								<div className='subheader'>
									<div className='subheader-right'>
										<ChangeLanguage TextColor={'black'} />
										{(user?.name ||
											localStorage.getItem('name')) && (
											<Dropdown
												overlay={menu}
												placement='bottomLeft'>
												<NavLink
													to='/account'
													style={{
														transition:
															'color 0.5s ease-in-out',
														color: 'black',
														fontFamily:
															'Nunito Sans',
														cursor: 'pointer',
														fontWeight: 700,
														fontSize: 12,
														margin: 0,
														padding: '0 10px',
													}}>
													{user?.photoURL ? (
														<Avatar
															referrerpolicy='no-referrer'
															referrerPolicy='no-referrer'
															src={
																<Image
																	referrerpolicy='no-referrer'
																	referrerPolicy='no-referrer'
																	src={
																		user?.photoURL ||
																		localStorage.getItem(
																			'photo',
																		)
																	}
																/>
															}
															style={{
																width: 30,
																height: 30,
																margin: '0 5px',
															}}
														/>
													) : (
														<Avatar
															referrerPolicy='no-referrer'
															size={20}
															style={{
																backgroundColor:
																	'rgb(249,107,24)',
																margin: '0 10',
															}}
															icon={
																<UserOutlined />
															}
														/>
													)}{' '}
													{localStorage.getItem(
														'name',
													) || ` ${user?.name}`}
												</NavLink>
											</Dropdown>
										)}
									</div>
								</div>
							</div>
						);
				}
			})()}
		</div>
	);
}

export default SubNavBar;
