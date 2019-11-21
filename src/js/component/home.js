import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: ["Primera tarea", "Segunda tarea", "Tercera tarea"],
			newTask: ""
		};
	}
	render() {
		let tasks = this.state.tasks;
		return (
			<div className="container text-center">
				<header className="todo-header">
					<h1 className="display-3">Mi lista de tareas</h1>
				</header>
				<section className="todo-body">
					<form>
						<input placeholder="tareas nuevas!" />
					</form>
					<ul className="main-list mx-auto">
						{tasks.map((value, index) => {
							return (
								<li key={index} className="list-item">
									{index}
								</li>
							);
						})}
					</ul>
				</section>
				<footer className="list-footer">
					<p>faltan x tareas por hacer</p>
				</footer>
			</div>
		);
	}
}

//create your first component
export default Home;
