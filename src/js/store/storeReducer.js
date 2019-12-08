const storeReducer = (store, action) => {
	switch (action.type) {
		case "SET_TASKS_LOADING":
			return {
				...store,
				hookTasks: {
					...store.hookTasks,
					isLoading: true
				}
			};
		case "SET_USER_TASKS":
			return {
				...store,
				hookTasks: {
					...store.hookTasks,
					tasks: action.payload,
					isLoading: false
				}
			};
		case "HANDLE_NEW_TASK_INPUT":
			return {
				...store,
				hookTasks: {
					...store.hookTasks,
					newTask: action.payload
				}
			};
	}
};

export default storeReducer;
