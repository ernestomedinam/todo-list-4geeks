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
				// if use does not exist, create it
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
						.then(response => {
							console.log("tried to create user: ");
							console.log(response.status);
							console.log(response.text());
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
					newTask: ""
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleAddTask(e) {
		e.preventDefault();
		this.setState({
			tasks: [
				...this.state.tasks,
				{
					label: this.state.newTask,
					done: false
				}
			],
			newTask: ""
		});
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	handleDeleteTask(e, indexToDelete) {
		let tasksLeft = this.state.tasks.filter(
			(task, index) => index != indexToDelete
		);
		this.setState({
			tasks: tasksLeft,
			newTask: this.state.newTask
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
						{tasks.map((task, index) => {
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
			</div>
		);
	}
}

//create your first component
export default Home;
