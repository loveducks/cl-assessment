import styled from "styled-components"

export const ThumbNail = styled.div`
	height: 150px;
	width: 150px;
	border-radius: 20px;
	background: url(${props => props.src});
	background-size: cover;
`

export const ThumbWrapper = styled.div`
	flex-wrap: wrap;
	margin: 10px 0;
`

export const ImgFull = styled.img`
	width: ${props => `${props.width}px`};
	text-align: center;
`

export const CloseBtn = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	font-size: 40px;
	line-height: 40px;
	cursor: pointer;
	color: #b5aeae;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	box-shadow: 1px 1px 3px #b5aeae;
	text-align: center;
	background: white;
	z-index: 999;
`
export const FavIcon = styled.span`
	// margin: 5px;
	font-size: 30px;
	color: ${props => props.active ? '#fd5270': 'white'};
	position: absolute;
	left: 20;
	top: 20;
`

export const ImgWrapper = styled.div`
	position: relative;
`