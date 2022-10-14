import React from 'react';
import { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function SignInGoogle({ ...props }) {
	const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};



	return <GoogleButton {...props} onClick={handleGoogleSignIn} />;
}
