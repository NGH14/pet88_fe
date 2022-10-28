import React from 'react';
export const routes = [
	{
		path: '*',
		element: React.lazy(() => import('../container/NotMatch')),
		private: false,
	},
	{
		path: '/',
		element: React.lazy(() => import('../container/Homepage')),
		private: false,
	},

	{
		path: '/sign-in',
		element: React.lazy(() => import('../container/Login')),
		private: false,
	},
	{
		path: '/sign-up',
		element: React.lazy(() => import('../container/Login')),
		private: false,
	},
	{
		path: '/forgot-password',
		element: React.lazy(() => import('../container/Login')),
		private: false,
	},
	{
		path: '/reset-password',
		element: React.lazy(() => import('../container/ResetPassword')),
		private: false,
	},
	{
		path: '/terms',
		element: React.lazy(() => import('../container/Terms')),
		private: false,
		header: React.lazy(() => import('../components/Navbar')),
	},
	{
		path: '/account',
		element: React.lazy(() => import('../container/Account')),
		private: true,
	},
	{
		path: '/admin',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},
	{
		path: '/admin/:id',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},
];
