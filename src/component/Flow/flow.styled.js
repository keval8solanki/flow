import styled from 'styled-components';

export const AddButton = styled.button`
	border-radius: 100px;
	height: 40px;
	width: 40px;
	font-size: 1.5em;
	color: white;
	cursor: pointer;
	border: none;
	background: #323232;
	position: fixed;
	z-index: 100;
	bottom: 20px;
	right: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	&:hover {
		background: #6c6c6c;
	}
`;
