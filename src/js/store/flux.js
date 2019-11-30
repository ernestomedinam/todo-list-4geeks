const getState = ({ getStore, getActions, setStore }) => {
	const APIurl =
		"https://assets.breatheco.de/apis/fake/todos/user/ernestomedinam";
	return {
		store: {
			todoList: {
				tasks: [],
				newTask: ""
			},
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
					todoList: {
						tasks: tasks,
						newTask: ""
					}
				});
			}
		}
	};
};

export default getState;
