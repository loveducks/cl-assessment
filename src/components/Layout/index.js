import React from "react"
// components
import Search from "../Search"
import Grid from "../Grid"
// styles
import {Container} from "./style"

const Layout = () => {
	return (
		<Container className='container'>
			<Search />
			<Grid />
		</Container>
	)
}

export default Layout
