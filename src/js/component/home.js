import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [
				"Hacer café",
				"Hacer la cama",
				"Tomar agua",
				"Regar las plantas"
			],
			newTask: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}
	handleAddTask(event) {
		event.preventDefault();
		this.setState({
			tasks: [...this.state.tasks, this.state.newTask],
			newTask: ""
		});
	}
	handleDeleteTask(event, id) {
		console.log(event, id);
		let tasksLeft = this.state.tasks.filter((value, index) => {
			return index != id;
		});
		console.log(tasksLeft);
		this.setState({
			newTask: this.state.newTask,
			tasks: tasksLeft
		});
	}
	handleChange(event) {
		// esto fue para mostrar c'omo y cuando se dispara el handleChange
		// console.log(
		// 	"epa Ehiber, esta es la variable uqwe recibi: ",
		// 	event.target.value
		// );
		this.setState({
			tasks: this.state.tasks,
			newTask: event.target.value
		});
	}
	render() {
		let tasks = this.state.tasks;
		return (
			<div className="container d-flex flex-column">
				<header className="todo-header text-center mb-3">
					<h1 className="display-2">Mi lista de tareas</h1>
				</header>
				<section className="todo-body">
					<form onSubmit={this.handleAddTask} className="text-center">
						<input
							className="my-5 mx-auto display-4"
							placeholder="Agrega más tareas!"
							onChange={this.handleChange}
							value={this.state.newTask}
						/>
					</form>
					<ul className="main-list mx-auto">
						{tasks.map((value, index) => {
							return (
								<li
									key={index}
									className="list-item display-4 my-2 mx-0">
									{value}
									<span
										onClick={event =>
											this.handleDeleteTask(event, index)
										}
										className="delete-button text-center"
									/>
								</li>
							);
						})}
					</ul>
					<footer className="list-footer mx-auto mt-5">
						{this.state.tasks.length > 1 ? (
							<p>
								Faltan {this.state.tasks.length} tareas por
								hacer...
							</p>
						) : this.state.tasks.length == 1 ? (
							<p>Falta 1 tarea por hacer!</p>
						) : (
							<p>Felicitaciones!! Viva el ocio!!!</p>
						)}
					</footer>
				</section>
			</div>
		);
	}
}

//create your first component
export default Home;
