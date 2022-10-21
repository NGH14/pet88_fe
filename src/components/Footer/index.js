import React from 'react';
import './style.css';
import logo from '../../assets/images/logo-text.png';
import { useTranslation } from 'react-i18next';
export default function FooterWave() {
	const [t] = useTranslation();
	return (
		<div class='pg-footer'>
			<footer class='footer'>
				<svg
					class='footer-wave-svg'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 100'
					preserveAspectRatio='none'>
					<path
						class='footer-wave-path'
						d='M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z'></path>
				</svg>
				<div class='footer-content'>
					<div class='footer-content-column'>
						<div class='footer-menu'>
							<h2 class='footer-menu-name'>
								{t('Working time')}
							</h2>
							<ul id='menu-get-started' class='footer-menu-list'>
								<li class='menu-item menu-item-type-post_type menu-item-object-product'>
									<p>
										{t('Monday')} - {t('Saturday')}
									</p>
									<p>08:00 - 14:00</p>
									<p>
										{t('Saturday')} & {t('Holidays')}
									</p>
									<p>08:00 - 12:00</p>
								</li>
							</ul>
						</div>
					</div>

					<div class='footer-content-column'>
						<div class='footer-menu'>
							<h2 class='footer-menu-name'> Quick Links</h2>
							<ul id='menu-quick-links' class='footer-menu-list'>
								<li class='menu-item menu-item-type-custom menu-item-object-custom'>
									<a
										target='_blank'
										rel='noopener noreferrer'
										href='#'>
										Support Center
									</a>
								</li>
								<li class='menu-item menu-item-type-custom menu-item-object-custom'>
									<a
										target='_blank'
										rel='noopener noreferrer'
										href='#'>
										Service Status
									</a>
								</li>
								<li class='menu-item menu-item-type-post_type menu-item-object-page'>
									<a href='#'>Security</a>
								</li>
								<li class='menu-item menu-item-type-post_type menu-item-object-page'>
									<a href='#'>Blog</a>
								</li>
								<li class='menu-item menu-item-type-post_type_archive menu-item-object-customer'>
									<a href='#'>Customers</a>
								</li>
								<li class='menu-item menu-item-type-post_type menu-item-object-page'>
									<a href='#'>Reviews</a>
								</li>
							</ul>
						</div>
					</div>
					<div class='footer-content-column'>
						<div class='footer-call-to-action'>
							<h2 class='footer-call-to-action-title'>
								{' '}
								Let's Chat
							</h2>
							<p class='footer-call-to-action-description'>
								{' '}
								Have a support question?
							</p>
							<a
								class='footer-call-to-action-button button'
								href='mailto:servicepet88@gmail.com?subject=Feedback&body = Message"'
								target='_self'>
								{' '}
								servicepet88@gmail.com
							</a>
						</div>
						<div class='footer-call-to-action'>
							<h2 class='footer-call-to-action-title'>
								{' '}
								You Call Us
							</h2>
							<p class='footer-call-to-action-link-wrapper'>
								{' '}
								<a
									class='footer-call-to-action-link'
									href='tel:+849199270xx'
									target='_self'>
									{' '}
									(+84) 9199270xx{' '}
								</a>
							</p>
						</div>
					</div>
				</div>
				<div class='footer-copyright'>
					<div class='footer-copyright-wrapper'>
						<p class='footer-copyright-text'>
							<p class='footer-copyright-link'>
								©2022. Pet88 | {t('All rights reserved')}.{' '}
							</p>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
