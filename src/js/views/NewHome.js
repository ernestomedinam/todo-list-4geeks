import React from "react";
import { AppContext } from "../store/appContext.js";

class NewHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "light",
			size: 4
		};
	}
	static contextType = AppContext;
	render() {
		let tasks = this.context.store.todoList.tasks;
		return <h2>Hello New Home {tasks.length}</h2>;
	}
}

export default NewHome;
