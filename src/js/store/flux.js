const getState = ({ getStore, getActions, setStore }) => {
	const APIurl = "https://assets.breatheco.de/apis/fake/todos/user/ernesto";
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
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						tasks = await response.json();
						userExists = true;
					} else if (response.stats == 404) {
						console.log(
							"no user found, please click on create button"
						);
						alert("no user found, please click on create button");
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
							"Content-Type": "application/JSON"
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
							"Content-Type": "application/JSON"
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
							"Content-Type": "application/JSON"
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
