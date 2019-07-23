import React from "react"

import Header from "./components/Header/Header"
import SoftKeys from "./components/SoftKeys/SoftKeys"
import OptionMenu, {OptionItem} from "./components/OptionMenu/OptionMenu"

const App = () => {
	return (
		<div className="app">
			<Header title="KaiOS UI Example" />

			<OptionMenu>
				<OptionItem
					text="Add Podcast"
					onClick={() => console.log("Add Podcast")} />
				<OptionItem
					text="Remove Podcast"
					onClick={() => console.log("Remove Podcast")} />
				<OptionItem
					text="About"
					onClick={() => console.log("About this App")} />
			</OptionMenu>

			<SoftKeys
				leftText="Add"
				onLeftClicked={() => console.log("Add")}
				enterText="Play"
				onEnterClicked={() => console.log("Play")}
				rightText="Options"
				onRightClicked={() => console.log("Options")} />
		</div>
	)
}

export default App
