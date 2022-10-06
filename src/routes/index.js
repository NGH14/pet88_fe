import Login from '../container/Login';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { MyComponent } from './../App';
import NotMatchPage from './../container/NotMatchPage/';

export const routers = createBrowserRouter([
	{
		path: '/',
		element: <MyComponent></MyComponent>,
		errorElement: <NotMatchPage />,
	},
]);
