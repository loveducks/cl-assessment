import styled from "styled-components"
export const FilterWrapper = styled.div`
	margin: 30px 0;
	background: #e5e5e5;
	padding: 20px 30px;
	border-radius: 20px;
	color: #b5aeae;
`

export const FilterTitle = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 25px;
	margin-bottom: 10px;
	@media (max-width: 768px) {
		font-size: 12px;
	}
`

export const InputText = styled.input`
	margin-right: 10px;
`

export const LabelStyled = styled.label`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 25px;
	@media (max-width: 768px) {
		font-size: 12px;
	}
`

export const ClearBtn = styled.button`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 19px;
	background: #dbdbdb;
	border-radius: 20px;
	margin-top: auto;
	border: none;
	color: #b5aeae;
	padding: 5px 15px;
	@media (max-width: 768px) {
		font-size: 12px;
	}
`
