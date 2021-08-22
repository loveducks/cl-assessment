import React, {useEffect, useState, useCallback} from "react"
import {debounce} from "lodash"
// redux
import {fetchCollections, collectionsSelector, fetchSearchResults} from "../../slices/collectionSlice"
import {useDispatch, useSelector} from "react-redux"
// components
import Filters from "../Filters"
// style
import {SearchBar, SearchWrapper, Button, SearchIcon} from "./style"

const Search = () => {
	const dispatch = useDispatch()
	const {filters} = useSelector(collectionsSelector)
	const [search, setSearch] = useState("")
	const [showFilters, setShowFilters] = useState(false)

	useEffect(() => {
		fetchCollections()
		dispatch(fetchCollections("2423569"))
	}, [])

	useEffect(() => {
		dispatch(fetchSearchResults(search, 1, filters))
	}, [search])

	const searchHandler = e => {
		setSearch(e.target.value)
	}

	const _handleDebounce = useCallback(debounce(searchHandler, 1000), [])

	return (
		<>
			<SearchWrapper className='row'>
				<div className='col-10'>
					<SearchBar
						className='col-12'
						type='text'
						placeholder='Search'
						aria-label='Search'
						onChange={_handleDebounce}
					/>
				</div>
				<SearchIcon>
					<i className='fa fa-search'></i>
				</SearchIcon>
				<Button className='col-2' onClick={() => setShowFilters(!showFilters)}>
					{window.innerWidth <= 576 ? <i className='fa fa-filter'></i> : "Filters"}
				</Button>
			</SearchWrapper>
			{showFilters && <Filters search={search} />}
		</>
	)
}

export default Search
