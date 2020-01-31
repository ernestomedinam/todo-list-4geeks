import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./views/home";
import NewHome from "./views/NewHome";
import AppContextProvider from "./store/appContext";
import HooksHome from "./views/HooksHome";
import HookCtxHome from "./views/HookCtxHome";
import HookedContextProvider from "./store/HookedContext";
import UserImages from "./views/UserImages";

const Layout = props => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/built-with-hooks">
					<AppContextProvider>
						<HooksHome />
					</AppContextProvider>
				</Route>
				<Route exact path="/class-with-context">
					<AppContextProvider>
						<NewHome />
					</AppContextProvider>
				</Route>
				<Route exact path="/hooked-context">
					<HookedContextProvider>
						<HookCtxHome />
					</HookedContextProvider>
				</Route>

				<Route exact path="/user-images" component={UserImages} />
			</Switch>
		</BrowserRouter>
	);
};

export default Layout;
