import styled from 'styled-components';

export const NodeStyled = styled.div`
	background: white;
	overflow: hidden;
	padding: 20px;
	width: auto;
	height: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	pointer-events: all;
	border-radius: 5px; /* 5px rounded corners */

	& {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`;

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
`;

export const Label = styled.label`
	color: red;
	display: block;
`;

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
`;

export const MainInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
