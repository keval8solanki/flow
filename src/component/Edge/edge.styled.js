import styled from 'styled-components';
import { Input } from '../Node/node.styled';

export const ForeignContainer = styled.div`
	background: transparent;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 40px;
`;

export const AddTextButton = styled.button`
	width: 20px;
	height: 20px;
	background: #eee;
	border: 1px solid #fff;
	cursor: pointer;
	border-radius: 50%;
	font-size: 12px;
	line-height: 1;
	&:hover {
		box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
	}
`;

export const EdgeInput = styled(Input)`
	padding-bottom: 0;
	margin-bottom: 0;
	border-bottom: none;
	text-align: center;
	background: white;
	width: fit-content;
	&:active {
		border-bottom: none;
	}
	&:focus {
		border-bottom: none;
	}
`;

export const EditableDiv = styled.div`
	word-wrap: break-word;
	word-break: break-word;
	outline: none;
	white-space: pre;
	background: white;
	width: fit-content;
	pointer-events: all;
`;
