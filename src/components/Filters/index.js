import React, {useEffect, useState} from "react"
// redux
import {clearFilters, collectionsSelector, fetchSearchResults, updateFilters} from "../../slices/collectionSlice"
import {useDispatch, useSelector} from "react-redux"
// styles
import {FilterWrapper, FilterTitle, InputText, LabelStyled, ClearBtn} from "./style"
// constants
import {sortForm, colorForm, orientationForm} from "../../helpers/constants"

const Filters = () => {
	const {apiSwitch, filters, search} = useSelector(collectionsSelector)

	const [sortParams, setSortParams] = useState(filters.sortParams)
	const [colorParams, setColorParams] = useState(filters.colorParams)
	const [orientationParams, setOrientationParams] = useState(filters.orientationParams)

	const dispatch = useDispatch()

	useEffect(() => {
		//prevent initial api triggers when search field is empty
		if (apiSwitch) {
			dispatch(
				fetchSearchResults(search, 1, {
					sortParams,
					colorParams,
					orientationParams
				})
			)
		} else dispatch(updateFilters({sortParams, colorParams, orientationParams}))
	}, [sortParams, colorParams, orientationParams])

	const _clearFilters = () => {
		setSortParams("relevant")
		setColorParams("any")
		setOrientationParams("any")
		dispatch(clearFilters())
	}

	return (
		<FilterWrapper>
			<div className='row'>
				<div className='col-md-2 col-lg-2 col-sm-5 col-5'>
					<FilterTitle>SORT BY</FilterTitle>
					{sortForm.map(form => (
						<LabelStyled className='col-12' key={form.value}>
							<InputText
								type='radio'
								value={form.value}
								name={form.name}
								checked={sortParams === form.value}
								onChange={e => setSortParams(e.target.value)}
							/>
							{form.label}
						</LabelStyled>
					))}
				</div>
				<div className='col-md-3 col-lg-3 col-sm-6 col-6'>
					<FilterTitle>COLOR</FilterTitle>
					{colorForm.map(form => (
						<LabelStyled className='col-12' key={form.value}>
							<InputText
								type='radio'
								value={form.value}
								name={form.name}
								checked={colorParams === form.value}
								onChange={e => setColorParams(e.target.value)}
							/>
							{form.label}
						</LabelStyled>
					))}
				</div>
				<div className='col-md-4 col-lg-4 col-sm-12 col-12'>
					<FilterTitle>ORIENTATION</FilterTitle>
					{orientationForm.map(form => (
						<LabelStyled className='col-6' key={form.value}>
							<InputText
								type='radio'
								value={form.value}
								name={form.name}
								checked={orientationParams === form.value}
								onChange={e => setOrientationParams(e.target.value)}
							/>
							{form.label}
						</LabelStyled>
					))}
				</div>
				<div className='col-lg-3 col-md-3 col-12 d-flex justify-content-end mt-4'>
					<ClearBtn onClick={_clearFilters}>Clear Filters</ClearBtn>
				</div>
			</div>
		</FilterWrapper>
	)
}

export default Filters
