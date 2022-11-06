import './style.css';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/index';
import CatVideo from '../../assets/video/pet_animation.mp4';
import CatPoster from '../../assets/images/cat_animation.webp';
// import Icon404 from 'assets/images/MnQWcWb6SrY.svg';

export default function NotMatchPage() {
	const navigate = useNavigate();

	return (
		<div className='notfound_page'>
			<div className='notfound_text'>
				<h2 id='notfound_header'>404</h2>

				<h2 id='notfound_header'>Oops! Page for URL not found </h2>
				<p id='notfound_text'>
					We could not find the page you were looking for.
				</p>
				<section className='notfound_buttonwrapper'>
					<Button
						label='Back to Hompage'
						primary
						backgroundColor='rgb(49, 49, 44)'
						variant='contained'
						onClick={() => navigate('/')}>
						Return to homepage
					</Button>
				</section>
			</div>
			<video
				loop
				playsinline='playsinline'
				className='autoplay-video'
				preload='auto'
				data-autoplay
				src={CatVideo}
				poster={CatPoster}
				data-expand='-10'
				autoPlay
				muted
			/>
		</div>
	);
}
