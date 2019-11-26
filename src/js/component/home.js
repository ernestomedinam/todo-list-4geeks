import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import TaskList from "./TaskList";

const Home = props => {
	return (
		<div className="container d-flex flex-column">
			<header className="todo-header text-center mb-3">
				<h1 className="display-3">Mi lista de tareas</h1>
			</header>
			<TaskList />
		</div>
	);
};

//create your first component
export default Home;
