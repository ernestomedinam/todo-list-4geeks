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
    }
    handleAddTask(e) {
        e.preventDefault();
        let task = e.target.value;
        this.setState({
            ...this.state,
            tasks: [
                ...this.state.tasks,
                this.state.newTask
            ]
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
					<form
                        onSubmit={handleAddTask}
                        className="text-center">
						<input
							className="my-5 mx-auto display-4"
							placeholder="Agrega más tareas!"
						/>
					</form>
					<ul className="main-list mx-auto">
						{tasks.map((value, index) => {
							return (
								<li
									key={index}
									className="list-item display-4 my-2 mx-0">
									{value}
								</li>
							);
						})}
					</ul>
					<footer className="list-footer mx-auto mt-5">
						<p>Faltan {this.state.tasks.length} tareas por hacer...</p>
					</footer>
				</section>
			</div>
		);
	}
}

//create your first component
export default Home;
