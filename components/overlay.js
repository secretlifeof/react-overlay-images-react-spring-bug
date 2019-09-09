import { animated, useSpring } from 'react-spring'
import { styled } from 'linaria/react'

import ImageSrcset from '../components/image-srcset'

// const images = [
// 	'/static/asoggetti-C4HO6MzEWrU-unsplash.jpg',
// 	'/static/eduardo-flores-v1XoQijG5xU-unsplash.jpg',
// 	'/static/jakub-sejkora-utqJcneoFjo-unsplash.jpg',
// 	'/static/asoggetti-C4HO6MzEWrU-unsplash.jpg',
// 	'/static/eduardo-flores-v1XoQijG5xU-unsplash.jpg',
// 	'/static/jakub-sejkora-utqJcneoFjo-unsplash.jpg'
// ]

const images = [
	'https://source.unsplash.com/weekly?water',
	'https://source.unsplash.com/weekly?hill',
	'https://source.unsplash.com/weekly?face',
	'https://source.unsplash.com/weekly?brain',
	'https://source.unsplash.com/weekly?dance'
]

const Main = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* top: 0; */
  /* height: 100vh;
  width: 100vw; */
  z-index: 10;
  /* pointer-events: ${(props) => (props.pointer ? 'all' : 'none')}; */
  /* overflow: hidden; */
  background: #3CB371;
  text-align: center;

  .scroll-body {
    overflow-y: scroll;
		position: relative;
		height: 100%;
		width: 100%;
  }
`

const Image = styled.img`
	position: relative;
	object-fit: cover;
	margin: 0;
	width: 100%;
	height: 100vh;
	margin: 0;
	display: block;
`

const CloseButton = styled.div`
	height: 10vh;
	background: orange;
	text-align: center;
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

export default ({ show = false, close }) => {
	const styleProps = useSpring({
		to: async (next) => {
			await next({
				visibility: show ? 'visible' : 'hidden'
			})
			await next({
				transform: show ? 'translate3d(0, 0vh, 0)' : 'translate3d(0, 100vh, 0)'
			})
		},
		from: { visibility: 'visible', transform: 'translate3d(0, 100vh, 0)' }
	})

	return (
		<Main style={styleProps} pointer={show.toString()}>
			<div className="scroll-body">
				<div>Hallo liebe Wesen</div>
				{images.map((image, index) => <ImageSrcset key={index} url={image} />)}
				<CloseButton onClick={close}>CLOSE</CloseButton>
			</div>
		</Main>
	)
}
