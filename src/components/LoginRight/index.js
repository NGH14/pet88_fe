import './style.css';

import React from 'react';
import a from '../../assets/images/j-balla-photography-cMtiWjiAvq4-unsplash-_1_.webp';
import b from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import c from '../../assets/images/page-image.60943b86 (1).webp';
import { useTranslation } from 'react-i18next';

const RightSideLogin = () => {
	const listImgs = [a, b, c];
	const [t] = useTranslation();

	const img = listImgs[Math.floor(Math.random() * listImgs.length)];

	return (
		<>
			<div className='loginpage-rightside'>
				<img src={img} alt='' className='loginpage-rightside_image' />
				<p className='loginpage-rightside_textoverlay'>
					{t(
						'You will be so happy with our paw-positively adorable pet care service',
					)}
					.<br></br>
					<span className='loginpage-rightside_smalltext'>
						{t('Pet88 is made with ❤️ for pets')}
					</span>
				</p>
			</div>
		</>
	);
};

export default React.memo(RightSideLogin);