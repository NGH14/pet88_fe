import Login from '../container/Login';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { MyComponent } from './../App';
import NotMatch from '../container/NotMatch';

export const routers = createBrowserRouter([
	{
		path: '/',
		element: <MyComponent></MyComponent>,
		errorElement: <NotMatch />,
	},
	{
		path: '/test',
		element: <MyComponent></MyComponent>,
	},
]);
