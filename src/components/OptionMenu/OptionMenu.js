import React, { useState, useEffect, useCallback }  from "react"
import PropTypes from 'prop-types';

import css from "./SoftKeys.module.css";

const OptionMenu = (props) => {
	const optionItems = props.children;
	const onItemSelected = props.onItemSelected;
	const [selectedItem, setSelectedItem] = useState(0);

	const requestFocus =  useCallback(
		(index) => {
			if(typeof optionItems !== undefined && optionItems.length > 0) {
				setSelectedItem(index);
				optionItems[selectedItem].focus();
			}
		},
		[setSelectedItem, optionItems]
	);

	const onKeyPressed = useCallback(
		({key}) => {
			switch(key) {
				case 'ArrowUp':
					requestFocus(prevItem => selected > 0 ? --selected : optionItems.length - 1);
					break;
				case 'ArrowDown':
					requestFocus(prevItem => prev < optionItems.length ? prev + 1 : 0);
					break;
				case 'Enter':
					onItemSelected(selectedItem);
					break;
				default:
					break;
			}
		},
		[requestFocus, onItemSelected],
	);

	useEffect(
		() => {
			setSelectedItem(0);

			document.addEventListener('keydown', onKeyPressed);

			return () => document.removeEventListener('keydown', onKeyPressed);
		}, [optionItems]
	);

	const renderedItems = React.Children.map(
		optionItems, (item, idx) => React.cloneElement(
			item, {
				index: idx,
				onFocusChange: this.onIndexChanged
			}
		)
	);

	return (
		<div className={css.optionmenu}>
			<h4>{props.header}</h4>
			<nav>
				{ renderedItems }
			</nav>
		</div>
	);
}

OptionMenu.propTypes = {
	type: PropTypes.string,
	header: PropTypes.string,
	onIndexChanged: PropTypes.func,
	children: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			onClick: PropTypes.func
	  })
	).isRequired
};

OptionMenu.defaultProps = {
	type: "OptionMenu",
	header: "Options",
	onIndexChanged: () => {},
	children: []
};

export default React.memo(OptionMenu);
