import React, { useCallback, useRef, useState } from 'react'
import { getBezierPath, EdgeLabelRenderer } from 'reactflow'

import {
	AddTextButton,
	EdgeInput,
	EditableDiv,
	ForeignContainer,
} from './edge.styled'

const foreignObjectSize = 40
export const Edge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	markerEnd,
	selected,
}) => {
	console.log({ selected })
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	})
	const editableDivRef = useRef(null)

	const onChange = useCallback((evt) => {
		const { innerText } = evt.target ?? {}
		if (innerText.trim()) {
			data.text = innerText
		}
	}, [])

	const selectedStyle = {
		background: 'purple',
	}

	return (
		<>
			<path
				id={id}
				style={{ ...style, strokeWidth: selected ? 4 : 2 }}
				className='react-flow__edge-path'
				d={edgePath}
				markerEnd={markerEnd}
			/>

			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						borderRadius: 5,
						fontSize: 12,
						fontWeight: 700,
						pointerEvents: 'all',
						width: '100%',
						background: 'transparent',
						textAlign: 'center',
						display: 'flex',
						justifyContent: 'center',
					}}
					className='nodrag nopan'>
					<EditableDiv
						ref={editableDivRef}
						onInput={onChange}
						contentEditable={true}
						placeholder='Add Text'>
						{data?.text ?? ''}
					</EditableDiv>
				</div>
			</EdgeLabelRenderer>
		</>
	)
}
