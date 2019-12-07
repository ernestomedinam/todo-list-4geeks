import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../store/appContext";

const HooksHome = props => {
	const { store, actions } = useContext(AppContext);
	const [initLoad, setInitLoad] = useState(false);
	const [isReady, setIsReady] = useState(false);
	// mount & dismount effect
	useEffect(() => {
		//effects
		console.log("running on mount dismount effect");
		if (!initLoad) {
			setInitLoad(true);
			setIsReady(true);
		}
		return () => {
			//cleanup
		};
	}, []);
	return (
		<div className="container d-flex flex-column">
			<header className="todo-header text-center mb-3">
				<h1 className="display-3">Mi lista de tareas</h1>
			</header>
			<ul>
				{store.tasks.map((task, index) => {
					return <li key={index}>{task.label}</li>;
				})}
			</ul>
			<button
				className={
					store.tasks.length > 0 && isReady
						? "btn btn-danger mt-4 mx-auto w-50"
						: "btn btn-danger mt-4 mx-auto w-50 disabled"
				}>
				Borrar tareas y usuario
			</button>
			<button
				className={
					store.tasks.length > 0 || !isReady
						? "btn btn-success my-2 mx-auto w-50 disabled"
						: "btn btn-success my-2 mx-auto w-50"
				}>
				Crear usuario
			</button>
		</div>
	);
};

export default HooksHome;
