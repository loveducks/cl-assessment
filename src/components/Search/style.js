import styled from "styled-components"

export const SearchWrapper = styled.div`
	position: relative;
	margin-top: 140px;
`
export const SearchBar = styled.input`
	height: 52px;
	background: #e5e5e5;
	border-radius: 20px;
	border: none;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 27px;
	padding-left: 50px;

	&:focus,
	&:active {
		outline: none;
	}
	&::placeholder {
		color: #b5aeae;
	}
`

export const SearchIcon = styled.div`
	position: absolute;
	left: 18px;
	top: 14px;
	width: 40px;
	color: #cdcaca;
`

export const Button = styled.button`
	background: #c4c4c4;
	border-radius: 20px;
	border: none;
	color: #e5e5e5;
	font-family: Open Sans;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 27px;
`
