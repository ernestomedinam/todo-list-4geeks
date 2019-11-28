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
		// solicitar tareas del usuario al API
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/JSON"
				}
			}
		) // fetch entrega un objeto response que recibimos como parámetro
			// para una función flecha dentro de .then()
			.then(respuesta => {
				// clonamos el objeto recibido para consultarlo y accederlo sin
				// violar su encapsulamiento antes de extraer la data
				let response = respuesta.clone();
				if (response.ok) {
					// si la respuesta es ok, porque el usuario existe, recibimos nuestra lista
					// y la devolvemos al siguiente then de ESTE fetch para que lo reciba como data
					// y actualice el estado.
					console.log("usuario existente, bienvenido de vuelta");
					return respuesta.json();
				} else if (response.status === 404) {
					// si la respuesta es 404 es porque el usuario no existe,
					// entonces solicitamos crear usuario al API
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
								// si la respuesta es 200 OK, entonces hemos creado nuestro usuario
								// con una lista que tiene una tarea de ejemplo con label: "sample task"
								console.log("nuevo usuario creado");
								// ahora intentamos recibir las tareas de este usuario recién creado.
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
										// aquí actualizamos el estado con la lista recibida en resGet
										// recibido como variable data después de hacer resGet.json()
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
			// este es el segundo then del primer fetch, este then ocurre
			// después del primero, pero no necesariamente todo lo que pasa
			// adentro del primero termina de ejecutarse antes de que este segundo
			// then empiece a ejecutarse.
			.then(data => {
				// cuando el usuario no existe, a este then no entra una data
				// definida, porque la respuesta fue 404 y el body de la respuesta
				// no tiene datos. Entonces preguntamos si data existe. Si no existe
				// entonces no hacemos nada (porque se supone que el usuario no existe y
				// de resolver eso se encargan los fetch anidados en este primero).
				// si data existe significa que el usuario existía cuando hicimos el primer
				// fetch, entonces data contiene las tareas del usuario y actualizamos el estado.
				if (data) {
					this.setState({
						tasks: data,
						newTask: ""
					});
				}
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
				if (response.ok) {
					console.log("usuario borrado.");
					this.setState({
						tasks: [],
						newTask: "Refresca para comenzar de nuevo!"
					});
				}
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
