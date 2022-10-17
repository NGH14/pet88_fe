import React, { useEffect } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import DogImg from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import './style.css';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import InValidDisplay from './../../components/InvalidCodeReset/index';
import LoadingSpinner from '../../components/LoadingSpinner';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
	const { user, VerifyPasswordResetCode } = UserAuth();
	const [verified, setVerified] = React.useState();
	const [loading, setLoading] = React.useState(true);

	const navigate = useNavigate();
	const query = useQuery();

	const oobCode = query.get('oobCode');
	console.log(verified);
	const onFinish = async () => {
		try {
			await VerifyPasswordResetCode(oobCode);
			setVerified(true);
		} catch (e) {
			console.log(e.message);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	});

	useEffect(() => {
		onFinish();
		if (!oobCode) {
			navigate('/');
		}
	}, []);

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div
					style={{
						backgroundImage: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${DogImg})`,
					}}
					className='resetpasswordpage'>
					<div className='resetpasswordpage-form'>
						{verified ? <ResetPasswordForm /> : <InValidDisplay />}
					</div>
				</div>
			)}
		</>
	);
}
