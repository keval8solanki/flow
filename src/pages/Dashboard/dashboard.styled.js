import { Fab, List } from '@mui/material'
import styled from 'styled-components'

export const StyledFab = styled(Fab)`
	&& {
		position: absolute;
		z-index: 1;
		bottom: 30px;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
`

export const StyledList = styled(List)`
	&& {
		max-height: calc(100vh - 64px);
		overflow: scroll;
	}
`
