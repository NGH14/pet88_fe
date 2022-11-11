import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentCancel() {
	const navigate = useNavigate();
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

	const handleClick = () => {
		navigate(-3, { replace: true });
	};
	return (
		<div>
			<Button onClick={() => handleClick()}>Back</Button>
		</div>
	);
}
