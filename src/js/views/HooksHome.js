import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../store/appContext";
import ListInput from "../component/ListInput";
import ListItem from "../component/ListItem";

const HooksHome = props => {
	const { store, actions } = useContext(AppContext);
	const [newTask, setNewTask] = useState("");
	const [working, setWorking] = useState(true);
	// working mount effect
	useEffect(() => {
		// effects
		if (working) {
			setWorking(false);
		}
		return () => {
			// cleanup
		};
	}, []);
	const handleAddTask = async e => {
		e.preventDefault();
		setWorking(true);
		if (newTask.trim().length < 3) {
			console.log("sorry, can't create such short tasks!");
			alert("sorry, can't create such short tasks!");
		} else {
			let tasks = [
				...store.tasks,
				{
					label: newTask,
					done: false
				}
			];
			let wasUpdated = await actions.fetchUpdateTasks(tasks);
			if (wasUpdated) {
				console.log("task added.");
				setNewTask("");
			} else {
				console.log("could not add task, try again...");
			}
		}
		setWorking(false);
	};
	const handleInputChange = e => {
		setNewTask(e.target.value);
	};
	const disableInput = () => {
		if (!store.tasks.length > 0 || working) {
			return true;
		} else {
			return false;
		}
	};
	const handleDeleteTask = async (e, idToDelete) => {
		setWorking(true);
		let tasksLeft = store.tasks.filter(
			(task, index) => index != idToDelete
		);
		let wasUpdated = await actions.fetchUpdateTasks(tasksLeft);
		if (wasUpdated) {
			console.log("task deleted.");
			setWorking(false);
		}
	};
	return (
		<div className="container d-flex flex-column">
			<header className="todo-header text-center mb-3">
				<h1 className="display-3">Mi lista de tareas</h1>
			</header>
			<section className="todo-body">
				<ListInput
					onChangeHandler={handleInputChange}
					onSubmitHandler={handleAddTask}
					value={newTask}
					disableInput={disableInput()}
					storeIsReady={!working}
				/>
				<ul className="main-list mx-auto">
					{store.tasks.map((task, index) => {
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
						{store.tasks.length > 1
							? `Faltan ${store.tasks.length} tareas por hacer...`
							: store.tasks.length == 1
								? `Falta ${
										store.tasks.length
								  } sola tarea por hacer!`
								: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
					</p>
				</footer>
			</section>
			<button
				onClick={async () => {
					setWorking(true);
					await actions.fetchDeleteUser();
					setWorking(false);
				}}
				disabled={!store.tasks.length > 0 || working}
				className={
					store.tasks.length > 0 && !working
						? "btn btn-danger mt-4 mx-auto w-50"
						: "btn btn-danger mt-4 mx-auto w-50 disabled"
				}>
				Borrar tareas y usuario
			</button>
			<button
				onClick={async () => {
					setWorking(true);
					await actions.fetchCreateUser();
					setWorking(false);
				}}
				className={
					store.tasks.length > 0 || working
						? "btn btn-success my-2 mx-auto w-50 disabled"
						: "btn btn-success my-2 mx-auto w-50"
				}
				disabled={store.tasks.length > 0 || working}>
				Crear usuario
			</button>
			<header className="todo-header text-center mb-3">
				<h2 className="display-4">Otro contenido</h2>
			</header>
		</div>
	);
};

export default HooksHome;
