import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
	const { user } = UserAuth();
	if (!user) {
		return <Navigate to='/' />;
	}

	return children;
};
