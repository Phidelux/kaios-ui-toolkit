import React, { useState, useEffect, useCallback }  from "react"
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import css from "./OptionMenu.module.css";

export const OptionItem = React.forwardRef(
	(props, ref) => {
		const onFocusChange = props.onFocusChange;
		const [, setFocus] = useState(false);

		const handleFocusChange = (newFocus) => {
			setFocus(newFocus);
			if(newFocus) {
				onFocusChange(props.index)
			}
		};

		return (
			<div
				tabIndex="0"
				ref={ref}
				onFocus={() => handleFocusChange(true)}
				onBlur={() => handleFocusChange(false)}
				className={css.optionmenu_item}>
				{props.text}
			</div>
		);
	}
);

OptionItem.propTypes = {
	type: PropTypes.string,
	index: PropTypes.number,
	text: PropTypes.string.isRequired,
	ref: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	onFocusChange: PropTypes.func
};

OptionItem.defaultProps = {
	type: "OptionItem",
	onClick: () => {}
};

const OptionMenu = (props) => {
	const itemRefs = [];
	const onIndexChanged = props.onIndexChanged;
	const onItemSelected = props.onItemSelected;
	const [selectedItem, setSelectedItem] = useState(0);

	const requestFocus = useCallback(
		index => {
			if(typeof itemRefs !== undefined && itemRefs.length > 0) {
				ReactDOM.findDOMNode(itemRefs[index].current).focus();

				onIndexChanged(index);
			}
		},
		[itemRefs, onIndexChanged]
	);

	const onKeyPressed = useCallback(
		({key}) => {
			switch(key) {
				case 'ArrowUp':
					setSelectedItem(prevItem => prevItem > 0 ? --prevItem : itemRefs.length - 1);
					break;
				case 'ArrowDown':
					setSelectedItem(prevItem => prevItem < itemRefs.length - 1 ? prevItem + 1 : 0);
					break;
				case 'Enter':
					onItemSelected(selectedItem);
					break;
				default:
					break;
			}
		},
		[itemRefs, selectedItem, onItemSelected]
	);

	useEffect(() => requestFocus(selectedItem), [requestFocus, selectedItem]);

	useEffect(
		() => {
			document.addEventListener('keydown', onKeyPressed);

			return () => document.removeEventListener('keydown', onKeyPressed);
		}, [onKeyPressed]
	);

	const renderedItems = React.Children.map(
		props.children, (item, idx) => {
			const childRef = React.createRef();

			itemRefs[idx] = childRef;

			return React.cloneElement(
				item, {
					index: idx,
					onFocusChange: requestFocus,
					ref: childRef
				}
			);
		}
	);

	return (
		<div className={css.optionmenu}>
			<header>{props.header}</header>
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
	onItemSelected: PropTypes.func,
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
	onIndexChanged: (index) => { console.log(`OptionMenu: Item ${index} focused`) },
	onItemSelected: (index) => { console.log(`OptionMenu: Item ${index} selected`) },
	children: []
};

export default React.memo(OptionMenu);
