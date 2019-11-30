const getState = ({ getStore, getActions, setStore }) => {
	const APIurl =
		"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam";
	return {
		store: {
			tasks: [],
			somethingElse: {}
		},
		actions: {
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
						console.log("this is tasks: ", tasks);
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
			},
			fetchUpdateTasks: async task => {
				const actions = getActions();
				const store = getStore();
				let tasks = [...store.tasks, task];
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
						wasUpdated = true;
						actions.fetchUserTasks();
					} else {
						console.log("tasks were not updated, try again");
					}
				} catch (error) {
					console.log(error);
				}
				return wasUpdated;
			}
		}
	};
};

export default getState;
