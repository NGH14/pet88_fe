import './style.css';

// import logoBlack from 'assets/images/2021-Greenwich-Black-Eng.webp';
import loginImg from '../../assets/images/j-balla-photography-cMtiWjiAvq4-unsplash-_1_.webp';
import LeftSideLogin from '../../components/LoginLeftSide';
import RightSideLogin from '../../components/LoginRightSide';

export default function Login({ returnUrl }) {
	return (
		<div className='loginpage-wrapper'>
			<LeftSideLogin
				// src={logoBlack}
				returnUrl={returnUrl}
			/>
			<RightSideLogin src={loginImg} />
		</div>
	);
}
