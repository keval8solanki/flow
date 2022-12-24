import { createBrowserRouter } from 'react-router-dom'
import Flow from '../component/Flow'
import Dashboard from '../pages/Dashboard'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/flow/:flowID',
		element: <Flow />,
	},
])
