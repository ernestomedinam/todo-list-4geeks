import React from "react";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			newTask: ""
		};
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
		this.handleDeleteAll = this.handleDeleteAll.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.fetchUserTasks = this.fetchUserTasks.bind(this);
		this.fetchCreateUser = this.fetchCreateUser.bind(this);
		this.fetchUpdateTasks = this.fetchUpdateTasks.bind(this);
		this.APIurl =
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam";
	}
	fetchUserTasks = async url => {
		try {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/JSON"
				}
			});
			if (response.ok) {
				let data = await response.json();
				return data;
			} else if (response.stats == 404) {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};
	fetchCreateUser = async url => {
		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/JSON"
				},
				body: "[]"
			});
			if (response.ok) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};
	fetchUpdateTasks = async (url, tasks) => {
		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/JSON"
				},
				body: JSON.stringify(tasks)
			});
			if (response.ok) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};
	async componentDidMount() {
		let fetchTasks = await this.fetchUserTasks(this.APIurl);
		if (!fetchTasks) {
			console.log("no user found, please click on create button");
			alert("no user found, please click on create button");
			fetchTasks = [];
		} else {
			console.log("welcome back.");
		}
		this.setState({
			tasks: fetchTasks,
			newTask: ""
		});
	}
	async handleAddTask(e) {
		e.preventDefault();
		if (this.state.newTask.trim().length < 3) {
			console.log("sorry, can't create such short tasks!");
			alert("sorry, can't create such short tasks!");
		} else {
			// create variable with current tasks in state
			let currentTasks = this.state.tasks;
			// add new task
			currentTasks.push({
				label: this.state.newTask,
				done: false
			});
			let tasksAreUpdated = await this.fetchUpdateTasks(
				this.APIurl,
				currentTasks
			);
			if (tasksAreUpdated) {
				console.log("task added.");
				let updatedTasks = await this.fetchUserTasks(this.APIurl);
				if (updatedTasks) {
					this.setState({
						tasks: updatedTasks,
						newTask: ""
					});
				}
			}
		}
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	async handleCreateUser(e) {
		try {
			let userWasCreated = await this.fetchCreateUser(this.APIurl);
			if (userWasCreated) {
				console.log("user created");
				let userTasks = await this.fetchUserTasks(this.APIurl);
				if (userTasks) {
					this.setState({
						tasks: userTasks,
						newTask: ""
					});
				} else {
					throw Error(
						"something went wrong fetching new user tasks!"
					);
				}
			} else {
				console.log("could not create user...");
			}
		} catch (error) {
			console.log(error);
		}
	}
	async handleDeleteAll(e) {
		try {
			let response = await fetch(this.APIurl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/JSON"
				}
			});
			if (response.ok) {
				console.log("user deleted");
				this.setState({
					tasks: [],
					newTask: ""
				});
			} else {
				console.log(
					"something failed: ",
					response.status,
					", ",
					response.statusText
				);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async handleDeleteTask(e, indexToDelete) {
		let tasksLeft = this.state.tasks.filter(
			(task, index) => index != indexToDelete
		);
		let tasksAreUpdated = await this.fetchUpdateTasks(
			this.APIurl,
			tasksLeft
		);
		if (tasksAreUpdated) {
			console.log("task deleted.");
			let updatedTasks = await this.fetchUserTasks(this.APIurl);
			if (updatedTasks) {
				this.setState({
					tasks: updatedTasks,
					newTask: ""
				});
			} else {
				console.log("it was final task, user deleted");
				this.setState({
					tasks: [],
					newTask: ""
				});
			}
		}
	}
	render() {
		let tasks = this.state.tasks;
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
							disabled={!this.state.tasks.length > 0}
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
							{this.state.tasks.length > 1
								? `Faltan ${
										this.state.tasks.length
								  } tareas por hacer...`
								: this.state.tasks.length == 1
									? `Falta ${
											this.state.tasks.length
									  } sola tarea por hacer!`
									: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
						</p>
					</footer>
				</section>
				<button
					onClick={this.handleDeleteAll}
					disabled={!this.state.tasks.length > 0}
					className={
						this.state.tasks.length > 0
							? "btn btn-danger mt-3 mx-auto w-50"
							: "btn btn-danger mt-3 mx-auto w-50 disabled"
					}>
					Borrar tareas y usuario
				</button>
				<button
					onClick={this.handleCreateUser}
					disabled={this.state.tasks.length > 0}
					className={
						this.state.tasks.length > 0
							? "btn btn-success my-2 mx-auto w-50 disabled"
							: "btn btn-success my-2 mx-auto w-50"
					}>
					Crear usuario
				</button>
			</div>
		);
	}
}

//create your first component
export default Home;
