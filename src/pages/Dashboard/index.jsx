import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
	List,
	ListItem,
	IconButton,
	AppBar,
	Toolbar,
	Divider,
	Typography,
	Snackbar,
	Alert,
} from '@mui/material'
import { Delete, Add, Menu } from '@mui/icons-material'
import { StyledFab, StyledList } from './dashboard.styled'
import { useState } from 'react'

export default function Dashboard() {
	const navigate = useNavigate()

	const [rerender, setRerender] = useState(false)
	const [deleteToastOpen, setDeleteToastOpen] = useState(false)

	const items = { ...localStorage }

	const open = (id = crypto.randomUUID()) => navigate(`/flow/${id}`)

	const remove = (id) => localStorage.removeItem(id)

	const FlowList = () => {
		const list = []
		for (const key in items) {
			list.push(
				<>
					<ListItem
						secondaryAction={
							<IconButton edge='end' aria-label='delete'>
								<Delete
									onClick={(e) => {
										e.stopPropagation()
										remove(key)
										setRerender((prev) => !prev)
										setDeleteToastOpen(true)
									}}
								/>
							</IconButton>
						}
						onClick={() => open(key)}
						key={key}>
						{JSON.parse(items[key]).title}
					</ListItem>
					<Divider />
				</>
			)
		}
		return <StyledList>{list}</StyledList>
	}
	return (
		<div>
			<AppBar
				position='fixed'
				color='primary'
				sx={{ top: 'auto', bottom: 0, background: '#062d54' }}>
				<Toolbar>
					<IconButton color='inherit' aria-label='open drawer'>
						<Menu />
					</IconButton>
					<StyledFab onClick={() => open()} color='primary' aria-label='add'>
						<Add />
					</StyledFab>
				</Toolbar>
			</AppBar>

			<Typography
				variant='h5'
				gutterBottom
				component='div'
				sx={{ p: 2, pb: 0 }}>
				Flow
			</Typography>
			<Divider />

			<Snackbar
				open={deleteToastOpen}
				autoHideDuration={6000}
				onClose={() => setDeleteToastOpen(false)}>
				<Alert
					onClose={() => setDeleteToastOpen(false)}
					severity='success'
					sx={{ width: '100%' }}>
					Flow deleted
				</Alert>
			</Snackbar>

			<FlowList />
		</div>
	)
}
