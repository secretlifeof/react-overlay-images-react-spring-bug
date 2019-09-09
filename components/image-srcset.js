import React, { Fragment } from 'react'
// import styled from 'styled-components';
import { styled } from 'linaria/react'

// import LazyLoad from 'react-lazyload'

const duration = 420

const Main = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	display: block;
	position: relative;
	min-height: 100%;
	overflow: hidden;
`

const Image = styled.img`
	position: ${(props) => props.position};
	bottom: 0;
	object-fit: ${(props) => props.fit.objectFit};
	margin: 0;
	width: ${(props) => props.fit.width};
	height: ${(props) => props.fit.height};
	min-height: ${(props) => props.fit.height};
	display: block;
`

const Picture = styled.picture`
	position: ${(props) => props.position};
	bottom: 0;
	object-fit: ${(props) => props.fit.objectFit};
	margin: 0;
	width: ${(props) => props.fit.width};
	height: ${(props) => props.fit.height};
	min-height: ${(props) => props.fit.height};
	display: block;
	background: transparent;
	/* background: #1c1c1c; */
`

const LazyComponent = ({ lazyload, children }) => {
	return lazyload ? <LazyLoad height="200vh">{children}</LazyLoad> : children
}

const ImageSrcset = ({
	url,
	urlMobile,
	sizesArray,
	id,
	imageFormats,
	fit,
	position,
	height,
	srcsetSizes,
	mobileMaxWidth,
	onLoadCallback,
	fadeIn = true,
	lazyload
}) => {
	const imageProcessorURL = 'https://images.weserv.nl'

	let imageURL = url
	let imageURLMobile = urlMobile

	// imageURL = imageURL && imageURL.startsWith('https') ? imageURL.replace('https://', 'ssl:') : imageURL
	// imageURLMobile =
	// 	imageURLMobile && imageURLMobile.startsWith('https') ? imageURLMobile.replace('https://', 'ssl:') : imageURLMobile

	const singleImageURL = `${imageProcessorURL}/url=$https://raw.githubusercontent.com/h2non/imaginary/master/testdata/large.jpg&w=1000&il&output=jpeg`

	const imageCollection = imageFormats.map((format) => {
		const srcSet = sizesArray.reduce((acc, width) => {
			if (urlMobile && width > 1024) {
				return acc + `${imageProcessorURL}/?url=${imageURL}&w=${width}&il&output=${format} ${width}w,`
			} else if (!urlMobile) {
				return acc + `${imageProcessorURL}/?url=${imageURL}&w=${width}&il&output=${format} ${width}w,`
			} else return acc
		}, '')
		const srcSetMobile =
			urlMobile &&
			sizesArray.reduce((acc, width) => {
				if (width <= 1024) {
					return acc + `${imageProcessorURL}/?url=${imageURLMobile}&w=${width}&il&output=${format} ${width}w,`
				} else return acc
			}, '')

		return { format, srcSet, srcSetMobile }
	})

	const fitImage =
		fit === 'contain'
			? {
					objectFit: 'contain',
					width: '100%',
					height: 'auto'
				}
			: fit

	return (
		<Main>
			<Picture
				fit={fitImage}
				position={position}
				styleHeight={height}
				onload={() => {
					onLoadCallback()
				}}
			>
				{imageCollection.map((imageObj, index) => (
					<Fragment key={index}>
						{!imageObj.srcSetMobile ? (
							<source
								key={index + 'first'}
								media=""
								type={`image/${imageObj.format}`}
								// src={singleImg}
								srcSet={imageObj.srcSet}
								sizes={srcsetSizes}
							/>
						) : (
							<source
								key={index + 'first'}
								media={`(min-width: 1024px)`}
								type={`image/${imageObj.format}`}
								// src={singleImg}
								srcSet={imageObj.srcSet}
								sizes={srcsetSizes}
							/>
						)}

						{imageObj.srcSetMobile && (
							<source
								key={index + 'second'}
								media={`(max-width: ${mobileMaxWidth - 1}px)`}
								type={`image/${imageObj.format}`}
								// src={singleImg}
								srcSet={imageObj.srcSetMobile}
								sizes={srcsetSizes}
							/>
						)}
					</Fragment>
				))}
				<Image src={singleImageURL} alt="test" fit={fitImage} position={position} styleHeight={height} />
			</Picture>
		</Main>
	)
}

export const sizesList = [ 320, 640, 768, 1024, 1366, 1600, 1920, 2570 ]

ImageSrcset.defaultProps = {
	sizesArray: sizesList,
	imageFormats: [ 'webp', 'jpeg' ],
	fit: {
		objectFit: 'cover',
		width: '100%',
		height: '100%'
	},
	zIndex: 'auto',
	json: {},
	src: null,
	position: 'absolute',
	height: '100%',
	srcsetSizes: '100vw',
	mobileMaxWidth: 1024,
	lazyload: true,
	url: null,
	urlMobile: null
}

export default ImageSrcset

// export default graphql(IMAGE_QUERY, {
//   options: props => ({ variables: { id: props.id } }),
//   props: ({ data }) => ({
//     data
//   })
// })(ImageSrcset);
