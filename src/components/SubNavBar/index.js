import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';
import Logo from '../../assets/images/Group 1.png';
import LogoWhite from '../../assets/images/Group 3.png';

import { useEffect } from 'react';
import ChangeLanguage from '../ChangeLanguage/index';
import './style.css';

function SubNavBar() {
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
		<div
			style={
				navBg
					? {
							backgroundColor: '#fff',
							transition: 'background-color 0.5s ease-in-out',
					  }
					: {}
			}>
			<div className='subheader mobileHidden'>
				<div className='mobileHidden'>
					<ChangeLanguage
						TextColor={
							visible || navBg ? 'black' : 'white'
						}></ChangeLanguage>
				</div>
			</div>
		</div>
	);
}

export default SubNavBar;
