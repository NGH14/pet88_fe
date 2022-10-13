import './style.css';

import logoBlack from '../../assets/images/logo-text.png';
import loginImg from '../../assets/images/j-balla-photography-cMtiWjiAvq4-unsplash-_1_.webp';
import LeftSideLogin from '../../components/LoginLeftSide';
import RightSideLogin from '../../components/LoginRightSide';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function Login({ returnUrl }) {
	const { user } = UserAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (user !== null) {
			navigate('/');
		}
	}, [user]);

	return (
		<>
			{!user && (
				<div className='loginpage-wrapper'>
					<LeftSideLogin src={logoBlack} returnUrl={returnUrl} />
					<RightSideLogin src={loginImg} />
				</div>
			)}
		</>
	);
}
