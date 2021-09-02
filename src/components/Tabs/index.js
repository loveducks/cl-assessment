import React  from "react"
// redux
import {changeTabs, collectionsSelector} from "../../slices/collectionSlice"
import {useDispatch, useSelector} from "react-redux"
// components
// styles
import { Container } from "./style"

const Tabs = () => {
	const {isFav} = useSelector(collectionsSelector)
    const dispatch = useDispatch()

    const _changeTab = (tab) => {
        dispatch(changeTabs(tab))
    }
    
	return (
		<Container className='container'>
            <div onClick={() => _changeTab(false)}>{ isFav ? "Home" : "HOME"}</div>
            <div onClick={() => _changeTab(true)}>{ isFav ? "FAVORITES" : "Favorites"}</div>
		</Container>
	)
}

export default Tabs 
