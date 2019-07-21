import React from "react"

import Header from "./components/Header/Header"
import SoftKeys from "./components/SoftKeys/SoftKeys"

const App = () => {
	return (
		<div className="app">
			<Header title="KaiOS UI Example" />

			<SoftKeys
				leftText="Add"
				enterText="Play"
				rightText="Options" />
		</div>
	)
}

export default App
