import React from "react"
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// HINT: This component should not handle rerendering on its own.
class ListView extends React.PureComponent {
	childs = this.props.children;
	listItems = this.childs.filter((child) => { child.props.type !== "Separator"});

	constructor() {
		super();

		document.addEventListener('keydown', this.keyPressed);

		this.state = {
			selectedItem: 0
		};
	}

	// Autofocus first item in list
	componentDidMount() {
		this.requestFocus(0);
	}

	// Restore item focus on update
	componentDidUpdate() {
		this.requestFocus(this.state.selectedItem);
	}

	onIndexChanged = (idx) => {
		this.setState({ selectedItem: idx });
		this.props.onIndexChanged(idx);
	}

	requestFocus = (index) => {
		ReactDOM.findDOMNode(this.state.items[index].current).focus();
		this.onIndexChanged(index);
	}

	// Update the selected item on key up/down
	keyPressed = (event) => {
		let selected = this.state.selectedItem;

		switch(event.key) {
			case 'ArrowUp':
				selected = (selected - 1 >= 0) ? --selected : this.listItems.length - 1;
				this.requestFocus(selected);
				break;
			case 'ArrowDown':
				selected = (selected + 1 < this.listItems.length) ? ++selected : 0;
				this.requestFocus(selected);
				break;
			default:
				break;
		}
	}

	render() {
		let renderedItems = React.Children.map(listItems, (item, idx) => {
			// Ignore seperators
			if(item.props.type === "Separator") {
				return item;
			}

			// Inject the current list index, onFocusChanged callback and 
			return React.cloneElement(child, {
				index: idx,
				onFocusChanged: this.onIndexChanged
			});
		});

		return (
			<div className="list-view">
				{ renderedItems }
			</div>
		)
	}
}

ListView.propTypes = {
	type: ProtoTypes.string,
	children: PropTypes.array.isRequired,
	onIndexChanged: PropTypes.func
};

ListView.defaultProps = {
	type: "ListView",
	onIndexChanged: () => {}
};

export default ListView;
