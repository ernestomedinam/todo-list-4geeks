import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

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
	}
	componentDidMount() {
		// try to get user tasks
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		)
			.then(response => {
				// clone response so to access on console.logs without accessing response.
				let res = response.clone();
				console.log(res.ok);
				console.log(res.status);
				console.log(res.text());
				// if user does not exist, create it
				if (res.status == 404) {
					let emptyArray = [];
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
						{
							method: "POST",
							body: JSON.stringify(emptyArray),
							headers: {
								"Content-Type": "application/JSON"
							}
						}
					)
						.then(secondResponse => {
							console.log("tried to create user: ");
							console.log(secondResponse.status);
							console.log(secondResponse.text());
							// if user created correctly
							if (secondResponse.ok) {
								fetch(
									"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
									{
										method: "GET",
										headers: {
											"Content-Type": "application/JSON"
										}
									}
								)
									.then(thirdResponse => {
										return thirdResponse.json();
									})
									.catch(error => console.log(error));
							} else {
								return [
									{
										label: "ERROR, user not created",
										done: false
									}
								];
							}
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					// if user exists, return response in json format
					return response.json();
				}
			})
			.then(data => {
				console.log(data);
				this.setState({
					tasks: data,
					newTask: this.state.newTask
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleAddTask(e) {
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
			this.setState({
				...this.state,
				newTask: ""
			});
			console.log(currentTasks);
			// send request to API
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
				{
					method: "PUT",
					body: JSON.stringify(currentTasks),
					headers: {
						"Content-Type": "application/JSON"
					}
				}
			)
				.then(response => {
					if (response.ok) {
						// task added successfully
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
							{
								method: "GET",
								headers: {
									"Content-Type": "application/JSON"
								}
							}
						)
							.then(secondResponse => {
								return secondResponse.json();
							})
							.then(data => {
								this.setState({
									tasks: data,
									newTask: ""
								});
							})
							.catch(error => {
								console.log(error);
							});
					} else {
						// something failed
						console.log("error fetching tasks ", response.text());
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	handleDeleteAll(e) {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		)
			.then(response => {
				if (response.ok) {
					console.log(
						"taks deleted! ",
						response.status,
						response.text()
					);
					// create user and load
					let emptyArray = [];
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
						{
							method: "POST",
							body: JSON.stringify(emptyArray),
							headers: {
								"Content-Type": "application/JSON"
							}
						}
					)
						.then(secondResponse => {
							console.log("tried to create user: ");
							console.log(secondResponse.status);
							console.log(secondResponse.text());
							// if user created correctly
							if (secondResponse.ok) {
								fetch(
									"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
									{
										method: "GET",
										headers: {
											"Content-Type": "application/JSON"
										}
									}
								)
									.then(thirdResponse => {
										return thirdResponse.json();
									})
									.then(data => {
										this.setState({
											tasks: data,
											newTask: ""
										});
									})
									.catch(error => console.log(error));
							} else {
								this.setState({
									label: "ERROR, user not created",
									done: false
								});
							}
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					console.log(
						"couldn't delete tasks because: ",
						response.text()
					);
				}
			})
			.catch(error => console.log(error));
	}
	handleDeleteTask(e, indexToDelete) {
		let tasksLeft = this.state.tasks.filter(
			(task, index) => index != indexToDelete
		);
		console.log(tasksLeft);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "PUT",
				body: JSON.stringify(tasksLeft),
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		)
			.then(response => {
				if (response.ok) {
					// tasks updated successfully
					// if it was last task
					if (tasksLeft.length < 1) {
						// account was deleted, create it and load
						let emptyArray = [];
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
							{
								method: "POST",
								body: JSON.stringify(emptyArray),
								headers: {
									"Content-Type": "application/JSON"
								}
							}
						)
							.then(secondResponse => {
								console.log("tried to create user: ");
								console.log(secondResponse.status);
								console.log(secondResponse.text());
								// if user created correctly
								if (secondResponse.ok) {
									fetch(
										"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
										{
											method: "GET",
											headers: {
												"Content-Type":
													"application/JSON"
											}
										}
									)
										.then(thirdResponse => {
											return thirdResponse.json();
										})
										.then(data => {
											this.setState({
												tasks: data,
												newTask: ""
											});
										})
										.catch(error => console.log(error));
								} else {
									return [
										{
											label: "ERROR, user not created",
											done: false
										}
									];
								}
							})
							.catch(error => {
								console.log(error);
							});
					} else {
						// get current list from api
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
							{
								method: "GET",
								headers: {
									"Content-Type": "application/JSON"
								}
							}
						)
							.then(secondResponse => {
								return secondResponse.json();
							})
							.then(data => {
								this.setState({
									tasks: data,
									newTask: ""
								});
							})
							.catch(error => {
								console.log(error);
							});
					}
				} else {
					// something failed
					console.log("error fetching tasks ", response.text());
				}
			})
			.catch(error => {
				console.log(error);
			});
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
					className="btn btn-warning my-3 mx-auto w-50">
					Borrar todas las tareas!
				</button>
			</div>
		);
	}
}

//create your first component
export default Home;
