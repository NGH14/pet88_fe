import "./style.css";

import React from "react";

const RightSideLogin = ({ src }) => {
	return (
		<>
			<div className='loginpage-rightside'>
				<img src={src} alt='' className='loginpage-rightside_image' />
				<p className='loginpage-rightside_textoverlay'>
					UNIVERSITY IDEA MANAGEMENT
					<br></br>
					<span className='loginpage-rightside_smalltext'>
						made by group 26 with passion
					</span>
				</p>
			</div>
		</>
	);
};

export default React.memo(RightSideLogin);
