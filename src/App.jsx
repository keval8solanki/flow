import Flow from './component/Flow'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/flow/:flowID' element={<Flow />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
