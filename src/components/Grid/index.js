import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
// redux
import {collectionsSelector, fetchSearchResults} from "../../slices/collectionSlice"
import {useSelector, useDispatch} from "react-redux"
// components
import Thumb from "./Thumb"
// style
import {GridWrapper, Loader, TextStyled} from "./style"

const Grid = () => {
	const [page, setPage] = useState(1)
	const [pageEnd, setPageEnd] = useState(false)
	const dispatch = useDispatch()

	const {data, searchResults, search, filters, apiSwitch, totalPages} = useSelector(collectionsSelector)

	const _loadMore = () => {
		if (data.length >= 200 || page >= totalPages) {
			setPageEnd(true)
		} else {
			dispatch(fetchSearchResults(search, page + 1, filters))
			setPage(page + 1)
		}
	}

	useEffect(() => {
		setPage(1)
		setPageEnd(false)
	}, [search, filters])

	return (
		<GridWrapper className='row'>
			{apiSwitch && !searchResults.loading && data.length === 0 ? (
				<TextStyled>No results found</TextStyled>
			) : (
				<InfiniteScroll
					dataLength={data.length}
					next={_loadMore}
					hasMore={!pageEnd}
					endMessage={<TextStyled>Reched the end</TextStyled>}
					className='row'>
					{data.map((item, idx) => (
						<Thumb key={idx} urls={item.urls} height={item.height} width={item.width} />
					))}
				</InfiniteScroll>
			)}
			{searchResults.loading && (
				<div className='row justify-content-center'>
					<Loader src={"/loading.gif"} />
				</div>
			)}
		</GridWrapper>
	)
}

export default Grid
