import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./views/home";
import NewHome from "./views/NewHome";
import AppContextProvider from "./store/appContext";
import HooksHome from "./views/HooksHome";

const Layout = props => {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/class-with-context" component={NewHome} />
					<Route path="/built-with-hooks" component={HooksHome} />
				</Switch>
			</AppContextProvider>
		</BrowserRouter>
	);
};

export default Layout;
