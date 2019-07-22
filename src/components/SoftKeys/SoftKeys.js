import React, { useEffect, useCallback }  from "react"
import PropTypes from 'prop-types';

import css from "./SoftKeys.module.css";

const SoftKey = React.memo(
	(props) => {
		if(props.text === "" && [undefined, null, ""].includes(props.icon)) {
			return null;
		}

		return (
			<button
				onClick={event => {
					event.preventDefault();
					props.onClick();
				}}
				className={props.className ? props.className : null}>

				{props.icon ? <i class={props.icon}></i> : null}
				{props.text}
			</button>
		);
	}
);

// HINT: This component should not handle rerendering on its own.
const SoftKeys = (props) => {
	const onKeyPressed = useCallback(
		({key}) => {
			switch(key) {
				case 'SoftLeft':
					props.onLeftClicked();
					break;
				case 'Enter':
					props.onEnterClicked();
					break;
				case 'SoftRight':
					props.onRightClicked();
					break;
				default:
					break;
			}
		}
	);

	useEffect(
		() => {
			document.addEventListener('keydown', onKeyPressed);
			return () => document.removeEventListener('keydown', onKeyPressed);
		}, [onKeyPressed]
	);

	return (
		<footer className={css.softkeys}>
			<SoftKey
				text={props.leftText}
				onClick={props.onLeftClicked}
				className={css.left} />
			<SoftKey
				text={props.enterText}
				icon={props.enterIcon}
				onClick={props.onEnterClicked}
				className={css.center} />
			<SoftKey
				text={props.rightText}
				onClick={props.onRightClicked}
				className={css.right} />
		</footer>
	);
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

export default React.memo(SoftKeys);
