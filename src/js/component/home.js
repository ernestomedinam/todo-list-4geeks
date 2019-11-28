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
		// solicitar tareas del usuario
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		)
			.then(respuesta => {
				let response = respuesta.clone();
				console.log(response.status, response.text());
				if (response.ok) {
					// recibiemos nuestra lista
					return respuesta.json();
				} else if (response.status === 404) {
					// crear usuario
					console.log("intentando crear usuario");
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
						{
							method: "POST",
							body: "[]",
							headers: {
								"Content-Type": "application/JSON"
							}
						}
					)
						.then(resPost => {
							if (resPost.ok) {
								fetch(
									"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
									{
										method: "GET",
										headers: {
											"Content-Type": "application/JSON"
										}
									}
								)
									.then(resGet => resGet.json())
									.then(data => {
										this.setState({
											tasks: data,
											newTask: ""
										});
									})
									.catch(error => console.log(error));
							}
						})
						.catch(error => console.log(error));
				}
			})
			.then(data => {
				this.setState({
					tasks: data,
					newTask: ""
				});
			})
			.catch(error => console.log(error));
	}
	handleAddTask(e) {
		e.preventDefault();
		let newTaskObject = {
			label: this.state.newTask,
			done: false
		};
		let newList = [...this.state.tasks, newTaskObject];
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		)
			.then(response => {
				if (response.ok) {
					console.log(
						"Lista actualizada correctamente en el backend."
					);
					this.setState({
						tasks: newList,
						newTask: ""
					});
				}
			})
			.catch(error => console.log(error));
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	handleDeleteTask(e, indexToDelete) {
		// creamos lista fltrada sin la tarea que queremos borrar
		let tasksLeft = this.state.tasks.filter(
			(value, index) => index != indexToDelete
		);
		// fetch para actualizar lista de tareas en API
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
					console.log(
						"Lista actualizada correctamente en el backend."
					);
					this.setState({
						tasks: tasksLeft,
						newTask: ""
					});
				}
			})
			.catch(error => console.log(error));
	}
	handleDeleteAll() {
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
				this.setState({
					tasks: [],
					newTask: "Chao, refresca."
				});
			})
			.catch(error => console.log(error));
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
				<button
					onClick={this.handleDeleteAll}
					className="btn btn-lg btn-danger">
					Borrar todo, hasta el usuario
				</button>
			</div>
		);
	}
}

//create your first component
export default Home;
