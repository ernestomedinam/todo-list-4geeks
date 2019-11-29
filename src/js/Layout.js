import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./views/home";
import NewHome from "./views/NewHome";

const Layout = props => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/class-with-context" component={NewHome} />
			</Switch>
		</BrowserRouter>
	);
};

export default Layout;
