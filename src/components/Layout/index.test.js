import {shallow} from "enzyme"
import Layout from "./"
import Search from "../Search"
import Grid from "../Grid"

describe("<Layout />", () => {
	it("renders Layout with child Search", () => {
		const layout = shallow(<Layout />)
		expect(layout.containsMatchingElement(<Search />)).toEqual(true)
	})

	it("renders Layout with child Grid", () => {
		const layout = shallow(<Layout />)
		expect(layout.containsMatchingElement(<Grid />)).toEqual(true)
	})
})
