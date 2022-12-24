import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Authentication/Login'
import Signup from '../pages/Authentication/Signup'
import Dashboard from '../pages/Dashboard'
import Flow from '../pages/Flow'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/flow/:id',
		element: <Flow />,
	},
])
