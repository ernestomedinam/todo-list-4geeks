import React from "react";

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: ["Hacer café", "Hacer la cama", "Tomar agua"],
			newTask: ""
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}
	handleDeleteTask(event, taskId) {
		let tasksLeft = this.state.tasks.filter((value, index) => {
			return index !== taskId;
		});
		console.log(tasksLeft);
		this.setState({
			tasks: tasksLeft,
			newTask: this.state.newTask
		});
	}
	handleAddTask(event) {
		event.preventDefault();
		this.setState({
			tasks: [...this.state.tasks, this.state.newTask],
			newTask: ""
		});
	}
	handleInput(event) {
		console.log("Me estoy ejecutando: ", event.target.value);
		let value = event.target.value;
		this.setState({
			tasks: this.state.tasks,
			newTask: value
		});
	}
	render() {
		let tasks = this.state.tasks;
		return (
			<section className="todo-body">
				<form className="text-center" onSubmit={this.handleAddTask}>
					<input
						onChange={this.handleInput}
						className="my-5 mx-auto display-4"
						placeholder="Agrega más tareas!"
						value={this.state.newTask}
					/>
				</form>
				<ul className="main-list mx-auto">
					{tasks.map((task, index) => {
						return (
							<li
								onClick={event =>
									this.handleDeleteTask(event, index)
								}
								key={index}
								className="list-item display-4 my-2 mx-0">
								{task}
							</li>
						);
					})}
				</ul>
				<footer className="list-footer mx-auto mt-5">
					<p>faltan {this.state.tasks.length} tareas por hacer</p>
				</footer>
			</section>
		);
	}
}

export default TaskList;
