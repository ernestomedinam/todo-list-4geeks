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
		if (this.state.newTask.trim().length < 3) {
			console.log("sorry, can't create such short tasks!");
			alert("sorry, can't create such short tasks!");
		} else {
			this.setState({
				...this.state,
				isReady: false
			});
			let tasks = [
				...this.context.store.tasks,
				{
					label: this.state.newTask,
					done: false
				}
			];
			let wasUpdated = await this.context.actions.fetchUpdateTasks(tasks);
			if (wasUpdated) {
				console.log("task added.");
				this.setState({
					...this.state,
					newTask: "",
					isReady: true
				});
			}
		}
	}
	async handleDeleteTask(e, idToDelete) {
		this.setState({
			...this.state,
			isReady: false
		});
		let tasksLeft = this.context.store.tasks.filter(
			(task, index) => index != idToDelete
		);
		let wasUpdated = await this.context.actions.fetchUpdateTasks(tasksLeft);
		if (wasUpdated) {
			console.log("task deleted.");
			this.setState({
				...this.state,
				isReady: true
			});
		}
	}
	handleCreateUser(e) {
		this.context.actions.fetchCreateUser();
	}
	handleDeleteAll(e) {
		this.setState({
			...this.state,
			newTask: ""
		});
		this.context.actions.fetchDeleteUser();
	}
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
					onClick={e => this.handleDeleteAll()}
					className={
						tasks.length > 0
							? "btn btn-danger mt-3 mx-auto w-50"
							: "btn btn-danger mt-3 mx-auto w-50 disabled"
					}>
					Borrar tareas y usuario
				</button>
				<button
					onClick={e => this.handleCreateUser()}
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
