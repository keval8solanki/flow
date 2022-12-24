import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks'

export default function Dashboard() {
	const navigate = useNavigate()

	const items = { ...localStorage }

	const open = (id = crypto.randomUUID()) => navigate(`/flow/${id}`)

	const List = () => {
		const list = []
		for (const key in items) {
			list.push(
				<li onClick={() => open(key)} key={key}>
					{JSON.parse(items[key]).title}
				</li>
			)
		}
		return <ul>{list}</ul>
	}
	return (
		<div>
			<List />
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<button onClick={() => open()}>Add FLow</button>
			<button onClick={() => localStorage.clear()}>Delete all</button>
		</div>
	)
}
