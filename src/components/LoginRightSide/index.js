import './style.css';

import React from 'react';
const RightSideLogin = ({ src }) => {
	return (
		<>
			<div className='loginpage-rightside'>
				<img src={src} alt='' className='loginpage-rightside_image' />
				<p className='loginpage-rightside_textoverlay'>
					WELCOME BACK!
					<br></br>
					<span className='loginpage-rightside_smalltext'>
						Pet88 is made with ❤️ in Vietnam
					</span>
				</p>
			</div>
		</>
	);
};

export default React.memo(RightSideLogin);
