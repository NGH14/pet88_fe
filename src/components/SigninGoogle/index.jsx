import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const antIcon = (
	<LoadingOutlined
	  style={{
		fontSize: 20,
		color: '#F76A1A',
	}}
	  spin
	/>
  );
export default function SignInGoogle({ ...props }) {
	const { googleSignIn, user } = UserAuth();
	const [loading, setLoading] = useState(false);

	const handleGoogleSignIn = async () => {
		setLoading(true)
		try {
			await googleSignIn();
			setLoading(false)
		} catch (error) {
			toast.error('Fail to login in Google')
			setLoading(false)
			console.log(error);
		}
	};

	return (
		<Spin spinning={loading} indicator={antIcon}>
			<GoogleButton {...props} onClick={() => handleGoogleSignIn()} />
		</Spin>
	);
}