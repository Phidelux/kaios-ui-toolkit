import React from "react"
import PropTypes from 'prop-types';

// HINT: This component should not handle rerendering on its own.
class ListItem extends React.PureComponent {

	constructor() {
		super();
	}
	
	render() {
		return (
			<div className="list-item"></div>
		);
	}
}

ListItem.propTypes = {
	type: ProtoTypes.string,
	primaryText: ProtoTypes.string,
	secondaryText: ProtoTypes.string,

	onIndexChanged: PropTypes.func
};

ListItem.defaultProps = {
	type: "ListItem",
	onIndexChanged: () => {}
};

export default ListItem;
