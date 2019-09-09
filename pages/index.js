import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import OverLay from '../components/overlay'

const Main = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`

const Box = styled.div`
	margin-top: 40px;
	margin-left: 40px;
	height: 200px;
	width: 200px;
	background-color: tomato;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	@media (hover) {
		&:hover {
			background-color: green;
		}
	}
`

export default () => {
	const [ visibility, setVisibility ] = useState(false)

	return (
		<Main>
			<Box onClick={() => setVisibility(true)}>PUSH ME</Box>
			<OverLay show={visibility} close={() => setVisibility(false)} />
		</Main>
	)
}

const globals = css`
	:global() {
		body,
		html {
			font-family: 'Grotesque MT';
			margin: 0;
			text-transform: uppercase;
			letter-spacing: 0.85px;
			font-size: 1.05vw;
			box-sizing: border-box;
			color: '#9C9C9C';
			user-select: none;
			line-height: 1.35;
			background: '#1c1c1c';
		}
		html {
			height: 100%;
		}
		body {
			min-height: 100%;
		}
		body #root {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		*,
		*:before,
		*:after {
			box-sizing: inherit;
		}

		ul,
		p {
			padding: 0;
			margin: 0;
			list-style-type: none;
		}

		article {
			letter-spacing: 0;
		}

		a {
			color: inherit !important;
			text-decoration: none !important;
		}
		a:link {
			text-decoration: none !important;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			display: block;
			font-size: 1em;
			margin: 0;
			font-weight: normal;
		}
	}
`
