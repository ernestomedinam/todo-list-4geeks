const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todoList: {
				tasks: [],
				newTask: ""
			}
		},
		actions: {
			fetchUserTasks: async url => {
				try {
					let response = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						let data = await response.json();
						return data;
					} else if (response.stats == 404) {
						return;
					}
				} catch (error) {
					console.log(error);
				}
			},
			fetchCreateUser: async url => {
				try {
					let response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: "[]"
					});
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
