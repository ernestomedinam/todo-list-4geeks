const imageReducer = (store, action) => {
	switch (action.type) {
		case "SET_USER_IMAGES":
			return {
				...store,
				userImages: action.payload
			};
	}
};

export default imageReducer;
