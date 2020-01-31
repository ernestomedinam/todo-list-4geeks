import React, { useState, useEffect, useReducer, createContext } from "react";
import storeReducer from "./storeReducer";
import PropTypes from "prop-types";

export const HookedContext = createContext(null);

const HookedContextProvider = props => {
	const APIurl = "https://assets.breatheco.de/apis/fake/todos/user/ernesto";
	const [store, dispatch] = useReducer(storeReducer, {
		hookTasks: {
			tasks: [],
			isLoading: true,
			newTask: ""
		},
		somethingElse: {}
	});
	const actions = {
		handleInputChange: e => {
			dispatch({
				type: "HANDLE_NEW_TASK_INPUT",
				payload: e.target.value
			});
		},
		fetchUserTasks: async () => {
			let tasks = [];
			try {
				let response = await fetch(APIurl, {
					method: "GET",
					headers: {
						"Content-Type": "application/JSON"
					}
				});
				if (response.ok) {
					tasks = await response.json();
				} else if (response.status == 404) {
					console.log("no user found, please click on create button");
					alert("no user found, please click on create button");
				}
			} catch (error) {
				console.log("something failed");
				console.log(error);
			}
			dispatch({
				type: "SET_USER_TASKS",
				payload: tasks
			});
		},
		fetchUpdateTasks: async (tasks, isAdd) => {
			dispatch({
				type: "SET_TASKS_LOADING"
			});
			if (isAdd) {
				dispatch({
					type: "HANDLE_NEW_TASK_INPUT",
					payload: ""
				});
			}
			try {
				let response = await fetch(APIurl, {
					method: "PUT",
					headers: {
						"Content-Type": "application/JSON"
					},
					body: JSON.stringify(tasks)
				});
				if (response.ok) {
					await actions.fetchUserTasks();
				} else {
					console.log("tasks were not updated, try again");
				}
			} catch (error) {
				console.log(error);
			}
		},
		fetchDeleteUser: async () => {
			dispatch({
				type: "SET_TASKS_LOADING"
			});
			try {
				let response = await fetch(APIurl, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/JSON"
					}
				});
				if (response.ok) {
					console.log("user deleted");
					dispatch({
						type: "SET_USER_TASKS",
						payload: []
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
		},
		fetchCreateUser: async () => {
			dispatch({
				type: "SET_TASKS_LOADING"
			});
			try {
				let response = await fetch(APIurl, {
					method: "POST",
					headers: {
						"Content-Type": "application/JSON"
					},
					body: "[]"
				});
				if (response.ok) {
					console.log("user created.");
					await actions.fetchUserTasks();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		console.log("running mount effect");
		actions.fetchUserTasks();
		return () => {
			// cleanup
			console.log("running cleanup on dismount");
		};
	}, []);
	return (
		<HookedContext.Provider value={{ store, actions }}>
			{props.children}
		</HookedContext.Provider>
	);
};

export default HookedContextProvider;

HookedContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
