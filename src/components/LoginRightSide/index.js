import './style.css';

import React from 'react';
const RightSideLogin = ({ src }) => {
	return (
		<>
			<div className='loginpage-rightside'>
				<img src={src} alt='' className='loginpage-rightside_image' />
				<p className='loginpage-rightside_textoverlay'>
					You will be so happy with our paw-sitively adorable pet
					sitting service.
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
