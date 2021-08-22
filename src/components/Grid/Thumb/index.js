import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
// styles
import {ThumbNail, ThumbWrapper, ImgFull, CloseBtn} from "./style"

const Thumb = ({urls, height, width}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [adjustedHeight, setAdjustedHeight] = useState(500)
	const [adjustedWidth, setAdjustedWidth] = useState(500)

	const ratio = width / height

	//scale modal to image
	const adjustRatio = () => {
		const h = window.innerHeight
		const w = window.innerWidth

		let scaledHeight = (w * 0.5) / ratio
		let scaledWidth = w * 0.5

		if (w <= 768) {
			scaledHeight = (w * 0.8) / ratio
			scaledWidth = w * 0.8
		} else {
			if (ratio <= 0.6) {
				scaledHeight = (h * 0.5) / ratio
				scaledWidth = h * 0.5
			} else if (ratio <= 1) {
				scaledHeight = (h * 0.6) / ratio
				scaledWidth = h * 0.6
			}
		}
		setAdjustedHeight(scaledHeight)
		setAdjustedWidth(scaledWidth)
	}

	useEffect(() => adjustRatio(), [])

	const _toggle = () => setIsOpen(!isOpen)

	const customStyles = {
		content: {
			width: `${adjustedWidth + 40}px`,
			height: `${adjustedHeight + 40}px`,
			left: "50%",
			top: "50%",
			marginLeft: `-${(adjustedWidth + 40) / 2}px`,
			marginTop: `-${(adjustedHeight + 40) / 2}px`,
			border: "unset",
			boxShadow: "1px 1px 8px #b5aeae",
			outline: "unset"
		}
	}

	return (
		<ThumbWrapper className='col-md-4 col-lg-2 col-sm-6 col-6 d-flex justify-content-center'>
			<ThumbNail src={urls.thumb} onClick={_toggle} />
			<Modal
				isOpen={isOpen}
				onRequestClose={_toggle}
				contentLabel='My dialog'
				style={customStyles}
				appElement={document.getElementsByClassName("App")}>
				<ImgFull
					src={window.innerWidth <= 768 ? urls.small : urls.regular}
					width={adjustedWidth}
					height={adjustedHeight}
				/>
				<CloseBtn onClick={_toggle}>&times;</CloseBtn>
			</Modal>
		</ThumbWrapper>
	)
}

Thumb.propTypes = {
	urls: PropTypes.object,
	width: PropTypes.number,
	height: PropTypes.number
}
export default Thumb
