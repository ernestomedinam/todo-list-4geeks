const getState = ({ getStore, getActions, setStore }) => {
	const APIurl =
		"https://3000-b7929254-f40d-46a8-a615-1c7df27b5b03.ws-us02.gitpod.io/todos/ernesto";
	return {
		store: {
			tasks: [],
			somethingElse: {}
		},
		actions: {
			fetchUserTasks: async () => {
				let tasks = [];
				let userExists = false;
				try {
					let response = await fetch(APIurl, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						tasks = await response.json();
						userExists = true;
					} else if (response.status == 404) {
						console.log(
							"no user found, please click on create button"
						);
						alert("no user found, please click on create button");
					} else {
						console.log("error in response: ", response.statusText);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					tasks: tasks
				});
				return userExists;
			},
			fetchUpdateTasks: async tasks => {
				const actions = getActions();
				let wasUpdated = false;
				try {
					let response = await fetch(APIurl, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(tasks)
					});
					if (response.ok) {
						await actions.fetchUserTasks();
						wasUpdated = true;
					} else {
						console.log("tasks were not updated, try again");
					}
				} catch (error) {
					console.log(error);
				}
				return wasUpdated;
			},
			fetchDeleteUser: async () => {
				try {
					let response = await fetch(APIurl, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						console.log("user deleted");
						setStore({
							tasks: []
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
				let actions = getActions();
				let userWasCreated = false;
				try {
					let response = await fetch(APIurl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: "[]"
					});
					if (response.ok) {
						await actions.fetchUserTasks();
						userWasCreated = true;
					}
				} catch (error) {
					console.log(error);
				}
				return userWasCreated;
			}
		}
	};
};

export default getState;
