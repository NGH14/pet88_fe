import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(-3, { replace: true });
	};

	const location = useLocation();
	const id = location.pathname.split('/')[3];
	const fetchDeleteData = async () => {
		try {
			const res = await axios.put(
				`http://localhost:3001/api/order/${id}`,
			);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchDeleteData();
	}, []);
	return (
		<div>
			<Button onClick={() => handleClick()}>Back</Button>
		</div>
	);
}
