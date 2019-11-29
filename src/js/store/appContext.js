import React, { createContext } from "react";
import getState from "./flux.js";
import PropTypes from "prop-types";

export const AppContext = createContext(null);

class AppContextProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = getState({
			getStore: () => this.state.store,
			getActions: () => this.state.actions,
			setStore: updatedStore =>
				this.setState({
					store: Object.assign(this.state.store, updatedStore),
					actions: { ...this.state.actions }
				})
		});
	}

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

export default AppContextProvider;

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
