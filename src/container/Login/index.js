import './style.css';

// import logoBlack from 'assets/images/2021-Greenwich-Black-Eng.webp';
// import loginImg from 'assets/images/Contact-CIC-Education-2-1024x858.webp';
import LeftSideLogin from '../../components/LoginLeftSide';
import RightSideLogin from '../../components/LoginRightSide';

export default function Login({ returnUrl }) {
	return (
		<div className='loginpage-wrapper'>
			<LeftSideLogin
				// src={logoBlack}
				returnUrl={returnUrl}
			/>
			<RightSideLogin
			// src={loginImg}
			/>
		</div>
	);
}
