import React from "react";
import PropTypes from "prop-types";

const ListItem = props => {
	return (
		<li className="list-item display-4 my-2 mx-0">
			{props.label}
			<span onClick={props.onClickHandler} className="delete-button" />
		</li>
	);
};

export default ListItem;

ListItem.propTypes = {
	label: PropTypes.string,
	onClickHandler: PropTypes.func
};
