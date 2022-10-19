import React from 'react';
import { Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { PrivateRoute } from '../utils/PrivateRoute';
export const listRoute = (list) => {
	return list.map((route, index) => {
		return (
			<Route
				key={index}
				path={route.path}
				element={
					<React.Suspense fallback={<LoadingSpinner />}>
						{route?.header && <route.header />}
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
