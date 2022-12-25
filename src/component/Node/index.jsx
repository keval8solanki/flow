import { useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import { EditableDiv } from '../Edge/edge.styled'
import {
	InputContainer,
	NodeStyled,
	MainInputContainer,
	Input,
	StyledHandle,
} from './node.styled'

export const Node = ({ data }) => {
	const { name = '', description = '' } = data ?? {}

	const onInput = useCallback((evt, name) => {
		evt.preventDefault()
		evt.stopPropagation()
		const { innerText } = evt.target ?? {}
		if (innerText.trim()) {
			data[name] = innerText
		}
	}, [])

	return (
		<NodeStyled>
			<StyledHandle type='target' position={Position.Top} />
			<EditableDiv
				contentEditable={true}
				placeholder='Title'
				className='nodrag nopan'
				onInput={(e) => onInput(e, 'name')}
				style={{
					fontWeight: 'bold',
				}}>
				{name ?? ''}
			</EditableDiv>

			<hr style={{ marginBottom: '10px', marginTop: '10px' }} />

			<EditableDiv
				contentEditable={true}
				placeholder='Type description here..'
				className='nodrag nopan'
				style={{ fontSize: '0.9em' }}
				onInput={(e) => onInput(e, 'description')}>
				{description ?? ''}
			</EditableDiv>

			<StyledHandle type='source' position={Position.Bottom} />
		</NodeStyled>
	)
}
