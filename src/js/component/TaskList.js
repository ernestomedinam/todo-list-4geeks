import React from "react";
import PropTypes from "prop-types";

const TaskList = props => {
	return (
		<section className="todo-body">
			{props.input}
			<ul className="main-list mx-auto">{props.items}</ul>
			<footer className="list-footer mx-auto mt-5">
				<p>
					{props.length > 1
						? `Faltan ${props.length} tareas por hacer...`
						: props.length == 1
							? `Falta ${props.length} sola tarea por hacer!`
							: "Felicitaciones, ya hiciste todo!!! Viva el ocio!!!"}
				</p>
			</footer>
		</section>
	);
};

export default TaskList;

TaskList.propTypes = {
	input: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.object),
	length: PropTypes.number
};
