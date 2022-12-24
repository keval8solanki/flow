import { useCallback, useEffect, useRef, useState } from 'react'
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
import { AddButton, Header } from './flow.styled'
import short from 'short-uuid'
import { Edge } from '../Edge'
import { initialEdges, initialNodes } from '../../initialdata'
import { getSelectedNode } from './flow.util'

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
	const reactFlowWrapper = useRef(null)
	const connectingNodeId = useRef(null)

	const reactFlowInstance = useReactFlow()
	const { project } = reactFlowInstance

	const [_nodes, _setNodes] = useLocalStorage('nodes', [])
	const [_edges, _setEdges] = useLocalStorage('edges', [])

	const [nodes, setNodes] = useState(_nodes)
	const [edges, setEdges] = useState(_edges)

	const selectedNode = getSelectedNode(_nodes)
	console.log({ selectedNode })

	useEffect(() => {
		_setNodes(nodes)
		_setEdges(edges)
	})

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
			console.log({ connection })
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
				const id = short.generate()
				const edgeID = short.generate()
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
		const selectedNode = getSelectedNode(_nodes)
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
		console.log({ x, y })
		const newNode = {
			id: short.generate(),
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
				<span class='material-symbols-outlined'>arrow_back_ios</span>
				<h2>Title </h2>
			</Header>
			<div className='unselectable' ref={reactFlowWrapper}>
				<AddButton onClick={onClick}>
					<span class='material-symbols-outlined'>add</span>
				</AddButton>
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
		</div>
	)
}

export default function () {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	)
}
