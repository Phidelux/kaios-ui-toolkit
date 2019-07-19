import React from "react"
import PropTypes from 'prop-types';

// HINT: Component does not rerender if props did not change.
const Header = React.memo(
	({title}) => {
		return (
			<h1 className="app-header">{title}</h1>
		)
	}
);

Header.propTypes = {
	title: PropTypes.string.isRequired
};

export default Header;
