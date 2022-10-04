import React from 'react';
import { Route } from 'react-router-dom';

export const listRoute = (list) => {
	return list.map((route, index) => {
		return (
			<Route
				key={index}
				path={route.path}
				element={
					<React.Suspense
						fallback={
							<div
								style={{
									background: 'var(--primary-color)',
									height: '100vh',
								}}>
								...
							</div>
						}>
						<route.component />
					</React.Suspense>
				}
			/>
		);
	});
};
