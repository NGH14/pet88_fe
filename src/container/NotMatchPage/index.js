import './style.css';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from './../../components/Button/index';
// import Icon404 from 'assets/images/MnQWcWb6SrY.svg';

export default function NotMatchPage() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='notfound_page'>
			<div className='notfound_text'>
				<h2 id='notfound_header'>Page for URL not found </h2>
				<p id='notfound_text'>{`Not match "${location.pathname}", please try a different URL`}</p>
				<section className='notfound_buttonwrapper'>
					<Button variant='contained' onClick={() => navigate('/')}>
						Return to homepage
					</Button>
					<Button variant='text' onClick={() => navigate(-1)}>
						Go back
					</Button>
				</section>

				{/* <img className='notfound_logo' src={DogImg} alt='' /> */}
			</div>
			<video
				loop
				playsinline='playsinline'
				class='autoplay-video'
				preload='auto'
				data-autoplay
				src='https://cdn.shopify.com/s/files/1/0577/0575/8880/files/Kat_rhr_petsnl_krabpalen_webshop_free_shipping_1.mp4?v=1635858506'
				data-expand='-10'
				autoPlay
				muted
			/>
		</div>
	);
}
