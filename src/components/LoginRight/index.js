import './style.css';

import React from 'react';
import a from '../../assets/images/j-balla-photography-cMtiWjiAvq4-unsplash-_1_.webp';

const RightSideLogin = () => {
	return (
		<>
			<div className='loginpage-rightside'>
				<img src={a} alt='' className='loginpage-rightside_image' />
				<p className='loginpage-rightside_textoverlay'>
					You will be so happy with our paw-positively adorable pet
					care service.
					<br></br>
					<span className='loginpage-rightside_smalltext'>
						Pet88 is made with ❤️ for pets in Vietnam
					</span>
				</p>
			</div>
		</>
	);
};

export default React.memo(RightSideLogin);
