import React from "react"
// redux
import {changeTabs, collectionsSelector} from "../../slices/collectionSlice"
import {useDispatch, useSelector} from "react-redux"
// components
import Search from "../Search"
import Grid from "../Grid"
import Thumb from "../Grid/Thumb"
// styles
import {Container, HomeWrapper, TabBtn, Menu} from "./style"

const Layout = () => {
	const {isFav} = useSelector(collectionsSelector)
    const dispatch = useDispatch()

    const _changeTab = (tab) => {
        dispatch(changeTabs(tab))
	}

	const urlList = localStorage.getItem('favorites')
	
	return (
		<Container className='container'>
			<Menu>
				<TabBtn onClick={() => _changeTab(false)} active={!isFav}>Home</TabBtn>
				<TabBtn onClick={() => _changeTab(true)} active={isFav}>Favorites</TabBtn>
			</Menu>
			{ !isFav ?
				<HomeWrapper >
					<Search />
					<Grid />
				</HomeWrapper>
				:
				<>
					{ urlList ? JSON.parse(urlList).map((item, idx) => (
						<Thumb key={idx} urls={item.urls} height={item.height} width={item.width} />
					))
					:
					<div>No Favorites yet</div>
					}
				</>
			}
		</Container>
	)
}

export default Layout
