import React from "react"

import Header from "./components/Header/Header"
import SoftKeys from "./components/SoftKeys/SoftKeys"

const App = () => {
	return (
		<div className="app">
			<Header title="KaiOS UI Example" />

			<SoftKeys
				leftText="Add"
				onLeftClicked={() => console.log("left")}
				enterText="Play"
				onEnterClicked={() => console.log("enter")}
				rightText="Options"
				onRightClicked={() => console.log("right")} />
		</div>
	)
}

export default App
