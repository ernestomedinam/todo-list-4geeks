import React, { useContext } from "react";
import { HookedContext } from "../store/HookedContext";
import ListItem from "../component/ListItem";
import ListInput from "../component/ListInput";

const HookCtxHome = props => {
	const { store, actions } = useContext(HookedContext);
	const handleAddTask = e => {
		e.preventDefault();
		if (store.hookTasks.newTask.trim().length < 3) {
			console.log("sorry, can't create such short tasks!");
			alert("sorry, can't create such short tasks!");
		} else {
			let tasks = [
				...store.hookTasks.tasks,
				{
					label: store.hookTasks.newTask.trim(),
					done: false
				}
			];
			actions.fetchUpdateTasks(tasks, true);
		}
	};
	const handleDeleteTask = async (e, idToDelete) => {
		let tasksLeft = store.hookTasks.tasks.filter(
			(task, index) => index != idToDelete
		);
		actions.fetchUpdateTasks(tasksLeft, false);
	};
	return (
		<div className="container d-flex flex-column">
			<header className="todo-header text-center mb-3">
				<h1 className="display-3">Mi lista de tareas</h1>
			</header>
			<section className="todo-body">
				<ListInput
					onChangeHandler={actions.handleInputChange}
					onSubmitHandler={handleAddTask}
					value={store.hookTasks.newTask}
					disableInput={
						!store.hookTasks.tasks.length > 0 ||
						store.hookTasks.isLoading
					}
					storeIsReady={!store.hookTasks.isLoading}
				/>
				<ul className="main-list mx-auto">
					{store.hookTasks.tasks.map((task, index) => {
						return (
							<ListItem
								key={index}
								label={task.label}
								onClickHandler={e => handleDeleteTask(e, index)}
							/>
						);
					})}
				</ul>
				<footer className="list-footer mx-auto mt-5">
					<p>
						{store.hookTasks.tasks.length > 1
							? `Faltan ${
									store.hookTasks.tasks.length
							  } tareas por hacer...`
							: store.hookTasks.tasks.length == 1
								? `Falta ${
										store.hookTasks.tasks.length
								  } sola tarea por hacer!`
								: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
					</p>
				</footer>
			</section>
			<button
				onClick={() => actions.fetchDeleteUser()}
				disabled={
					!store.hookTasks.tasks.length > 0 ||
					store.hookTasks.isLoading
				}
				className={
					store.hookTasks.tasks.length > 0 &&
					!store.hookTasks.isLoading
						? "btn btn-danger mt-4 mx-auto w-50"
						: "btn btn-danger mt-4 mx-auto w-50 disabled"
				}>
				Borrar tareas y usuario
			</button>
			<button
				onClick={() => actions.fetchCreateUser()}
				className={
					store.hookTasks.tasks.length > 0 ||
					store.hookTasks.isLoading
						? "btn btn-success my-2 mx-auto w-50 disabled"
						: "btn btn-success my-2 mx-auto w-50"
				}
				disabled={
					store.hookTasks.tasks.length > 0 ||
					store.hookTasks.isLoading
				}>
				Crear usuario
			</button>
			<header className="todo-header text-center mb-3">
				<h2 className="display-4">Otro contenido</h2>
			</header>
		</div>
	);
};

export default HookCtxHome;
