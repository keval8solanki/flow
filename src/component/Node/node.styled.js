import { Handle } from 'reactflow'
import styled from 'styled-components'

export const NodeStyled = styled.div`
	background: white;
	overflow: hidden;
	padding: 20px 10px;
	width: auto;
	height: auto;
	border: 1px solid #00000052;
	outline: none;
	transition: 0.3s;
	pointer-events: ${(props) => (props?.selected ? 'all' : 'none')};
	box-shadow: ${(props) =>
		props?.selected ? '0 4px 8px 0 rgba(0, 0, 0, 0.2)' : 'none'};

	border-radius: 5px; /* 5px rounded corners */

	&:hover,
	&:active {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
`

export const Input = styled.input`
	color: #404040;
	padding-bottom: 10px;
	margin-bottom: 10px;
	border: none;
	border-bottom: 1px solid #e2e2e2;
	font-weight: bold;
	width: 100%;

	resize: none;
	outline: none;

	&:active {
		border-bottom: 1px solid green;
	}
	&:focus {
		border-bottom: 1px solid green;
	}
`

export const Label = styled.label`
	color: red;
	display: block;
`

export const InputContainer = styled.div`
	label {
		display: block;
		font-weight: 500;
		font-size: 0.7em;
		color: grey;
		padding-bottom: 5px;
	}

	input,
	textarea {
		width: 100%;
		border: none;

		resize: none;
		outline: none;

		&:active {
			border-bottom: 1px solid green;
		}
		&:focus {
			border-bottom: 1px solid green;
		}
	}
`

export const MainInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

export const StyledHandle = styled(Handle)`
	width: 15px;
	height: 15px;
	transition: all 0.3s;
	background: grey;
	&:active,
	&:hover {
		background: green;
		width: 20px;
		height: 20px;
	}
`

export const Controller = styled.div`
	position: absolute;
	right: -28px;
	top: 0px;
	/* border-radius: 6px; */
	/* height: 79px; */
	/* width: 20px; */
	/* border: 1px solid #00000052; */
	/* outline: none; */
	/* transition: 0.3s; */
	/* background: white; */
`
