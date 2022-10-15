import React, { useEffect } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import DogImg from '../../assets/images/Wallpaper-Linz-Doggies-Turquiose-1.webp';
import './style.css';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
	const { user } = UserAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	return (
		!user && (
			<div
				style={{
					backgroundImage: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${DogImg})`,
				}}
				className='resetpasswordpage'>
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.5 }}
					className='resetpasswordpage-form'>
					<ResetPasswordForm />;
				</motion.div>
			</div>
		)
	);
}
