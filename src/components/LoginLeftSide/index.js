import './style.css';

import React from 'react';

// import LoginForm from "../LoginForm";

const LeftSideLogin = ({ src, returnUrl }) => {
	return (
		<>
			<div className='loginpage-leftside'>
				<img src={src} alt='' className='leftside_logo' />

				<div className='leftside_content'>
					{/* <LoginForm returnUrl={returnUrl} /> */}
				</div>
			</div>
		</>
	);
};

export default React.memo(LeftSideLogin);
