import React from "react"
import PropTypes from 'prop-types';

import css from "./SoftKeys.module.css";

const SoftKey = (props) => {
	if(props.text === "" && [undefined, null, ""].includes(props.icon)) {
		return null;
	}

	return (
		<div
			onClick={event => {
				event.preventDefault();
				props.onClick();
			}}
			className={props.className ? props.className : null}>

			{props.icon ? <i class={props.icon}></i> : null}
			{props.text}
		</div>
	);
};

// HINT: This component should not handle rerendering on its own.
class SoftKeys extends React.PureComponent {
	constructor() {
		super();

		document.addEventListener('keydown', this.keyPressed);
	}

	// Update the selected item on key up/down
	keyPressed = (event) => {
		switch(event.key) {
			case 'SoftLeft':
				this.props.onLeftClicked();
				break;
			case 'Enter':
				this.props.onEnterClicked();
				break;
			case 'SoftRight':
				this.props.onRightClicked();
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<footer className={css.softkeys}>
				<SoftKey
					text={this.props.leftText}
					onClick={this.props.onLeftClicked}
					className={css.left} />
				<SoftKey
					text={this.props.enterText}
					icon={this.props.enterIcon}
					onClick={this.props.onEnterClicked}
					className={css.center} />
				<SoftKey
					text={this.props.rightText}
					onClick={this.props.onRightClicked}
					className={css.right} />
			</footer>
		);
	}
}

SoftKeys.propTypes = {
	type: PropTypes.string,
	leftText: PropTypes.string,
	enterText: PropTypes.string,
	rightText: PropTypes.string,
	enterIcon: PropTypes.string,
	onLeftClicked: PropTypes.func,
	onEnterClicked: PropTypes.func,
	onRightClicked: PropTypes.func
};

SoftKeys.defaultProps = {
	type: "SoftKeys",
	leftText: "",
	enterText: "",
	rightText: "",
	enterIcon: null,
	onLeftClicked: () => {},
	onEnterClicked: () => {},
	onRightClicked: () => {}
};

export default SoftKeys;
