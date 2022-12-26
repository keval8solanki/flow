import { useCallback, useRef } from 'react'
import { Handle, Position } from 'reactflow'
import { EditableDiv } from '../Edge/edge.styled'
import {
	InputContainer,
	NodeStyled,
	MainInputContainer,
	Input,
	StyledHandle,
	Controller,
} from './node.styled'

import { OpenWith, Delete, ContentCopy } from '@mui/icons-material'

export const Node = (props) => {
	console.log(props)
	const { selected, data } = props ?? {}
	const { name = '' } = data ?? {}

	const onInput = useCallback((evt, name) => {
		evt.preventDefault()
		evt.stopPropagation()
		const { innerText } = evt.target ?? {}
		data[name] = innerText
	}, [])

	return (
		<>
			<NodeStyled selected={selected}>
				<StyledHandle type='target' position={Position.Top} />
				<EditableDiv
					contentEditable={true}
					placeholder='Write here..'
					className='nodrag nopan'
					onInput={(e) => onInput(e, 'name')}
					suppressContentEditableWarning={true}
					// style={{
					// 	fontWeight: 'bold',
					// }}
				>
					{name ?? ''}
				</EditableDiv>

				{/* <hr style={{ marginBottom: '10px', marginTop: '10px' }} /> */}

				{/* <EditableDiv
				contentEditable={true}
				placeholder='Type description here..'
				className='nodrag nopan'
				style={{ fontSize: '0.9em' }}
				onInput={(e) => onInput(e, 'description')}>
				{description ?? ''}
			</EditableDiv> */}

				<StyledHandle type='source' position={Position.Bottom} />
			</NodeStyled>
			<Controller>
				<OpenWith
					style={{
						color: 'grey',
					}}
				/>
				{/* <Delete />
				<ContentCopy /> */}
			</Controller>
			{/* <Controller></Controller> */}
		</>
	)
}
