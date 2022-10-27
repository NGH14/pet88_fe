import React, { useState } from 'react';
import { Avatar, Image } from 'antd';

import { Anchor, Drawer, Button } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';
import { UserOutlined } from '@ant-design/icons';

import { useEffect } from 'react';
import ChangeLanguage from '../ChangeLanguage/index';
import './style.css';
import AuthButton from './../GoogleAuthButton/index';
import { useLocation, NavLink } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

function SubNavBar() {
	const locate = useLocation();
	const { user } = UserAuth();
	const [visible, setVisible] = useState(false);

	const [navBg, setNavBg] = useState(false);

	const changeNavBg = () => {
		window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
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
									<div className='subheader-right '>
										<ChangeLanguage
											TextColor={
												visible || navBg
													? 'black'
													: 'white'
											}
										/>
										{(user?.name ||
											localStorage.getItem('name')) && (
											<NavLink
												to='/account'
												style={{
													transition:
														'color 0.5s ease-in-out',
													color:
														visible || navBg
															? 'black'
															: 'white',
													fontFamily: 'Nunito Sans',
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

															margin: '0 10',
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
														icon={<UserOutlined />}
													/>
												)}{' '}
												{localStorage.getItem('name') ||
													` ${user?.name}`}
											</NavLink>
										)}
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
								<div className='subheader mobileHidden'>
									<div className='mobileHidden'>
										{user?.role === 'admin' && (
											<NavLink to='/admin'>Admin</NavLink>
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
								style={
									navBg
										? {
												backgroundColor: '#fff',
												transition:
													'background-color 0.5s ease-in-out',
										  }
										: {}
								}>
								<div className='subheader mobileHidden'>
									<div className='mobileHidden'>
										<ChangeLanguage
											TextColor={
												visible || navBg
													? 'black'
													: 'white'
											}></ChangeLanguage>
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
