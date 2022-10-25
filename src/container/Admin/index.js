import React from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import AddUser from './../../components/AddUser/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import { collection, getDocs } from 'firebase/firestore';
import { storage } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
	const [loading, setLoading] = React.useState(true);

	const { CheckRole, user } = UserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const getRole = async () => {
			if (user.role !== 'admin') {
				navigate('/');
			}
			setLoading(false);
		};
		getRole();
	}, [user]);

	return loading ? <LoadingSpinner /> : <p>test</p>;
}
