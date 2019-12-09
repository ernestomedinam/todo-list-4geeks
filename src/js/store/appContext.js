import React, { createContext, useState, useEffect } from "react";
import getState from "./flux.js";
import PropTypes from "prop-types";

export const AppContext = createContext(null);

const AppContextProvider = props => {
	const [state, setState] = useState(
		getState({
			getStore: () => state.store,
			getActions: () => state.actions,
			setStore: updatedStore =>
				setState({
					store: Object.assign(state.store, updatedStore),
					actions: { ...state.actions }
				})
		})
	);
	useEffect(() => {
		const fetchData = async () => {
			let userExists = await state.actions.fetchUserTasks();
			if (!userExists) {
				console.log("no user found, please click on create button");
				alert("no user found, please click on create button");
			}
		};
		fetchData();
		return () => {
			// cleanup
		};
	}, []); // runs only on first mount.
	return (
		<AppContext.Provider value={state}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
