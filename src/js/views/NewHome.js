import React from "react";
import { AppContext } from "../store/appContext.js";

class NewHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: true,
			theme: "light",
			size: 4,
			newTask: ""
		};
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	static contextType = AppContext;
	async handleAddTask(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			isReady: false
		});
		let task = {
			label: this.state.newTask,
			done: false
		};
		let wasUpdated = await this.context.actions.fetchUpdateTasks(task);
		console.log(wasUpdated);
		this.setState({
			...this.state,
			newTask: "",
			isReady: true
		});
	}
	handleDeleteTask(e, idToDelete) {}
	handleCreateUser(e) {}
	handleDeleteAll(e) {}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	render() {
		let tasks = this.context.store.tasks;
		let disableInput = () => {
			if (!tasks.length > 0 || !this.state.isReady) {
				return true;
			}
			return false;
		};
		return (
			<div className="container d-flex flex-column">
				<header className="todo-header text-center mb-3">
					<h1 className="display-3">Mi lista de tareas</h1>
				</header>
				<section className="todo-body">
					<form onSubmit={this.handleAddTask} className="text-center">
						<input
							className="my-5 mx-auto display-4"
							placeholder="Agrega más tareas!"
							onChange={this.handleInputChange}
							value={this.state.newTask}
							disabled={disableInput()}
						/>
					</form>
					<ul className="main-list mx-auto">
						{tasks.length > 0 &&
							tasks.map((task, index) => {
								return (
									<li
										key={index}
										className="list-item display-4 my-2 mx-0">
										{task.label}
										<span
											onClick={e =>
												this.handleDeleteTask(e, index)
											}
											className="delete-button"
										/>
									</li>
								);
							})}
					</ul>
					<footer className="list-footer mx-auto mt-5">
						<p>
							{tasks.length > 1
								? `Faltan ${tasks.length} tareas por hacer...`
								: tasks.length == 1
									? `Falta ${
											tasks.length
									  } sola tarea por hacer!`
									: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
						</p>
					</footer>
				</section>
				<button
					onClick={this.handleDeleteAll}
					className={
						tasks.length > 0
							? "btn btn-danger mt-3 mx-auto w-50"
							: "btn btn-danger mt-3 mx-auto w-50 disabled"
					}>
					Borrar tareas y usuario
				</button>
				<button
					onClick={this.handleCreateUser}
					className={
						tasks.length > 0
							? "btn btn-success my-2 mx-auto w-50 disabled"
							: "btn btn-success my-2 mx-auto w-50"
					}>
					Crear usuario
				</button>
			</div>
		);
	}
}

export default NewHome;
