import React from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import './style.css';
import { useTranslation } from 'react-i18next';
import dogImg from '../../assets/images/Summer-Header.jpg';
import bgHeader from '../../assets/images/navy-bg.png';

import { useLocation } from 'react-router-dom';
import FormBookingHomepage from './../FormBookingHomepage/index';

const HeroBlockStyled = styled.div`
	background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)),
		url(${dogImg}) no-repeat center center;
	width: 100%;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

const HeroInlineStyled = styled.div``;

function HeroImageHomePage({ HeaderText }) {
	const locate = useLocation();

	const [t] = useTranslation();
	return (
		<div>
			{(() => {
				switch (locate.pathname) {
					case '/':
						return (
							<HeroBlockStyled id='hero' className='heroBlock'>
								<div className='content'>
									<h3 className='content-title'>
										{t(
											'established & trusted pet care service',
										)}
									</h3>
									<div className='content-form'>
										<FormBookingHomepage></FormBookingHomepage>
									</div>
								</div>
							</HeroBlockStyled>
						);

					case '/account':
						return (
							<HeroInlineStyled
								id='hero'
								className='heroInline'></HeroInlineStyled>
						);

					default:
						return (
							<HeroInlineStyled id='hero' className='heroInline'>
								<div className='heroInline-header'>
									{HeaderText ?? 'Welcome'}
								</div>
							</HeroInlineStyled>
						);
				}
			})()}
		</div>
	);
}

export default HeroImageHomePage;
