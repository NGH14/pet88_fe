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
		path: '/admin/management-user',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},
	{
		path: '/admin/management-hotel',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},

	{
		path: '/admin/management-promotion',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},

	{
		path: '/admin/management-room-category',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},
	{
		path: '/admin/management-grooming',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},
	{
		path: '/admin/management-order',
		element: React.lazy(() => import('../container/Admin')),
		private: true,
	},

	{
		path: '/confirm/:id',
		element: React.lazy(() => import('../container/BookingConfirm')),
		private: false,
	},
	{
		path: '/booking/success',
		element: React.lazy(() => import('../container/SucessBooking')),
		private: false,
	},

	{
		path: '/search',
		element: React.lazy(() => import('../container/Search')),
		private: false,
	},
	{
		path: '/department/:id',
		element: React.lazy(() => import('../container/Department')),
		private: false,
	},
	{
		path: '/grooming/:id',
		element: React.lazy(() => import('../container/Grooming')),
		private: false,
	},
	{
		path: '/checkout',
		element: React.lazy(() => import('../container/Checkout')),
		private: false,
	},
	{
		path: '/checkout/cancel/:id',
		element: React.lazy(() => import('../container/CancelPayment')),
		private: false,
	},
	{
		path: '/checkout/success/:id',
		element: React.lazy(() => import('../container/SucessPayment')),
		private: false,
	},
	{
		path: '/undercontruction',
		element: React.lazy(() => import('../container/UnderDev')),
		private: false,
	},
];
