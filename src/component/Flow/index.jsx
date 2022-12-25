import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	MarkerType,
	MiniMap,
	ReactFlowProvider,
	useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useLocalStorage } from '../../hooks'

import { Node } from '../Node'
import { AddButton, Header, StyledToolBar } from './flow.styled'

import { Edge } from '../Edge'
import { initialEdges, initialNodes } from '../../initialdata'
import { getSelectedNode } from './flow.util'
import { EditableDiv } from '../Edge/edge.styled'
import Add from '@mui/icons-material/Add'
import {
	Alert,
	AppBar,
	IconButton,
	Menu,
	Snackbar,
	Toolbar,
} from '@mui/material'
import { StyledFab } from '../../pages/Dashboard/dashboard.styled'
import { ArrowBackIos, Save, Clear } from '@mui/icons-material'

const nodeTypes = { textUpdater: Node }
const edgeTypes = { custom: Edge }

const edgeOptions = {
	animated: true,
	style: {
		stroke: 'green',
	},
	label: 'animated styled edge',
	markerEnd: {
		type: MarkerType.ArrowClosed,
	},
}

const connectionLineStyle = { stroke: 'red' }

const Flow = () => {
	const { flowID } = useParams()
	const reactFlowWrapper = useRef(null)
	const connectingNodeId = useRef(null)
	const navigate = useNavigate()

	const reactFlowInstance = useReactFlow()
	const { project } = reactFlowInstance

	const [data, setData] = useLocalStorage(flowID, {})

	const titleRef = useRef(null)
	const [nodes, setNodes] = useState(data?.nodes ?? [])
	const [edges, setEdges] = useState(data?.edges ?? [])

	const [saveToast, setSaveToast] = useState(false)
	const [clearToast, setClearToast] = useState(false)

	const save = () => {
		const title = titleRef?.current?.innerText || 'My Flow'
		setData({
			title,
			nodes,
			edges,
		})
		setSaveToast(true)
	}

	const clear = () => {
		setNodes([])
		setEdges([])
		setClearToast(true)
	}

	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	)
	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	)
	const onConnect = useCallback(
		(connection) => {
			connection.type = 'custom'
			connection.data = {}

			setEdges((eds) => addEdge(connection, eds))
		},
		[setEdges]
	)

	const onConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId
	}, [])
	const onConnectEnd = useCallback(
		(event) => {
			const targetIsPane = event.target.classList.contains('react-flow__pane')

			if (targetIsPane) {
				const { top, left } = reactFlowWrapper.current.getBoundingClientRect()
				const id = crypto.randomUUID()
				const edgeID = crypto.randomUUID()
				const newNode = {
					id,
					position: project({
						x: event.clientX - left - 75,
						y: event.clientY - top,
					}),
					type: 'textUpdater',
					data: {},
				}

				setNodes((nds) => {
					return nds.concat(newNode)
				})
				setEdges((eds) =>
					eds.concat({
						id: edgeID,
						animated: true,
						source: connectingNodeId.current,
						target: id,
						type: 'custom',
						data: {},
					})
				)
			}
		},
		[project]
	)

	const getCenter = () => {
		const selectedNode = getSelectedNode(nodes)
		if (selectedNode) {
			const { x, y } = selectedNode.position ?? {}
			return [x, y + 200]
		}
		const x = window.innerWidth / 2
		const y = window.innerHeight / 2
		return [x, y]
	}
	const onClick = () => {
		const [x, y] = getCenter()

		const newNode = {
			id: crypto.randomUUID(),
			position: {
				x,
				y,
			},
			type: 'textUpdater',
			data: {},
		}
		reactFlowInstance.addNodes(newNode)
	}

	return (
		<div>
			<Header>
				<Link relative='path' to='/	'>
					<span class='material-symbols-outlined'>arrow_back_ios</span>
				</Link>
				<EditableDiv
					contentEditable={true}
					placeholder='Title'
					ref={titleRef}
					style={{
						fontWeight: 'bold',
					}}>
					{data?.title ?? 'My Flow'}
				</EditableDiv>
				<div>
					<button onClick={save}>Save</button>
					<button onClick={clear}>Clear</button>
				</div>
			</Header>

			<AppBar
				position='fixed'
				color='primary'
				sx={{ top: 0, background: '#062d54' }}>
				<Toolbar>
					<IconButton
						onClick={() => navigate('/')}
						color='inherit'
						aria-label='open drawer'>
						<ArrowBackIos />
					</IconButton>

					<EditableDiv
						contentEditable={true}
						placeholder='Title'
						ref={titleRef}
						style={{
							fontWeight: 'bold',
							color: 'white',
							background: 'transparent',
						}}>
						{data?.title ?? ''}
					</EditableDiv>
				</Toolbar>
			</AppBar>
			<div className='unselectable' ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					defaultEdgeOptions={edgeOptions}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					connectionLineStyle={connectionLineStyle}
					onConnectEnd={onConnectEnd}
					onConnectStart={onConnectStart}
					fitView
					minZoom={0.1}
					onlyRenderVisibleElements={true}
					edgeTypes={edgeTypes}>
					<Background color='#9a9a9a' />
					<Controls />
					{/* <MiniMap pannable zoomable /> */}
				</ReactFlow>
			</div>

			<AppBar
				position='fixed'
				color='primary'
				sx={{ top: 'auto', bottom: 0, background: '#062d54' }}>
				<StyledToolBar>
					<IconButton color='inherit' aria-label='open drawer'>
						<Clear onClick={clear} />
					</IconButton>
					<StyledFab onClick={onClick} color='primary' aria-label='add'>
						<Add />
					</StyledFab>
					<IconButton color='inherit' aria-label='open drawer'>
						<Save onClick={save} />
					</IconButton>
				</StyledToolBar>
			</AppBar>

			<Snackbar
				open={saveToast}
				autoHideDuration={2000}
				onClose={() => setSaveToast(false)}>
				<Alert
					onClose={() => setSaveToast(false)}
					severity='success'
					sx={{ width: '100%' }}>
					Flow saved
				</Alert>
			</Snackbar>

			<Snackbar
				open={clearToast}
				autoHideDuration={2000}
				onClose={() => setClearToast(false)}>
				<Alert
					onClose={() => setClearToast(false)}
					severity='info'
					sx={{ width: '100%' }}>
					Flow cleared
				</Alert>
			</Snackbar>
		</div>
	)
}

export default Flow
