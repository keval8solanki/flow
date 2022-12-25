import { Toolbar } from '@mui/material'
import styled from 'styled-components'

export const AddButton = styled.button`
	border-radius: 100px;
	padding: 10px;
	display: flex;
	color: white;
	cursor: pointer;
	border: none;
	background: #323232;
	position: fixed;
	z-index: 100;
	bottom: 20px;
	right: 20px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	&:hover {
		background: #6c6c6c;
	}
`

export const Header = styled.div`
	box-shadow: 0px 1px 20px 1px #0000001a;
	border-bottom: 1px solid grey;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	gap: 20px;
`

export const StyledToolBar = styled(Toolbar)`
	&& {
		justify-content: space-between;
	}
`
