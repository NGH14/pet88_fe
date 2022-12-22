import React from 'react';
import { Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { PrivateRoute } from './PrivateRoute';

const ListRoutes = (list) => {
	return list.map((route, index) => {
		return (
			<Route
				key={index}
				path={route.path}
				element={
					<React.Suspense fallback={<LoadingSpinner />}>
						{route.private ? (
							<PrivateRoute>
								<route.element />
							</PrivateRoute>
						) : (
							<route.element />
						)}
					</React.Suspense>
				}
			/>
		);
	});
};

export default ListRoutes;
