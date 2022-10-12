import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import React from 'react';
// const Homepage = React.lazy(() => import('../container/Homepage'));

export const routes = [
	{
		path: '*',
		element: React.lazy(() => {
			return Promise.all([
				import('../container/NotMatch'),
				new Promise((resolve) => setTimeout(resolve, 300)),
			]).then(([moduleExports]) => moduleExports);
		}),
		type: 'public',
	},
	{
		path: '/',
		element: React.lazy(() => {
			return Promise.all([
				import('../container/Homepage'),
				new Promise((resolve) => setTimeout(resolve, 600)),
			]).then(([moduleExports]) => moduleExports);
		}),
		type: 'public',
	},

	{
		path: '/signin',
		element: React.lazy(() => {
			return Promise.all([
				import('../container/Login'),
				new Promise((resolve) => setTimeout(resolve, 600)),
			]).then(([moduleExports]) => moduleExports);
		}),
		type: 'public',
	},
	{
		path: '/account',
		element: React.lazy(() => {
			return Promise.all([
				import('../container/Account'),
				new Promise((resolve) => setTimeout(resolve, 600)),
			]).then(([moduleExports]) => moduleExports);
		}),
		type: 'private',
	},
];
