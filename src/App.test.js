import {shallow} from "enzyme"
import App from "./App"
import Layout from "./components/Layout"

describe("<App />", () => {
	it("renders div with class App", () => {
		const app = shallow(<App />)
		expect(app.find("div.App").length).toEqual(1)
	})

	it("renders App with child Layout", () => {
		const app = shallow(<App />)
		expect(app.containsMatchingElement(<Layout />)).toEqual(true)
	})
})
