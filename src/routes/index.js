import React from 'react';

export const routes = [
	{
		path: '*',
		component: React.lazy(() => import('../containers/NotFoundPage')),
	},
	{
		path: '/',
		component: React.lazy(() => import('../containers/Homepage')),
	},
	{
		path: '/products',
		component: React.lazy(() => import('../containers/ProductList')),
	},
	{
		path: '/search',
		component: React.lazy(() => import('../components/Search/SearchList')),
	},
	{
		path: '/products/:id',
		component: React.lazy(() => import('../containers/ProductDetails')),
	},
	{
		path: '/404',
		component: React.lazy(() => import('../containers/NotFoundPage')),
	},
	{
		path: '/inconstruction',
		component: React.lazy(() => import('../containers/InconstructionPage')),
	},
];
