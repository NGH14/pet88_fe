import React, { useEffect } from 'react';
import axios from 'axios';
export default function ListOfUser({ token }) {
	useEffect(() => {
		if (token) {
			fetchData(token);
		}
	}, [token]);

	const fetchData = async (token) => {
		try {
			const res = await axios.get('http://localhost:3001/api/user', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>List of todo</h1>
		</div>
	);
}
