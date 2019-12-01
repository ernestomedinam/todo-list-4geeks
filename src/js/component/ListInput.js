import React from "react";
import PropTypes from "prop-types";

const ListInput = props => {
	return (
		<form onSubmit={props.onSubmitHandler} className="text-center">
			<input
				className="my-5 mx-auto display-4"
				placeholder="Agrega más tareas!"
				onChange={props.onChangeHandler}
				value={props.value}
				disabled={props.disableInput}
			/>
			{!props.storeIsReady && <div className="snake-loader" />}
		</form>
	);
};

export default ListInput;

ListInput.propTypes = {
	onSubmitHandler: PropTypes.func,
	onChangeHandler: PropTypes.func,
	value: PropTypes.string,
	disableInput: PropTypes.bool,
	storeIsReady: PropTypes.bool
};
