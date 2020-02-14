import React, { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import imageReducer from "./imageReducer";

export const ImageContext = createContext(null);

const ImageContextProvider = props => {
	const APIurl =
		"https://3000-b7929254-f40d-46a8-a615-1c7df27b5b03.ws-us02.gitpod.io/todos/ernesto/images";
	const staticAPIurl =
		"https://3000-b7929254-f40d-46a8-a615-1c7df27b5b03.ws-us02.gitpod.io";
	const [store, dispatch] = useReducer(imageReducer, {
		staticAPIurl
	});
	const actions = {
		fetchUserImages: async () => {
			// try to fetch get images from endpoint
			let images = [];
			try {
				let response = await fetch(APIurl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					// apparently we received a list with user images
					images = await response.json();
				} else {
					console.log("response not ok: ", response.statusText);
				}
			} catch (error) {
				console.log("here is an error: ", error);
			}
			dispatch({
				type: "SET_USER_IMAGES",
				payload: images
			});
		},
		fetchUploadUserImage: async formData => {
			console.log("here we shall try to fetch post to api");
			try {
				let response = await fetch(APIurl, {
					body: formData,
					method: "POST"
				});
				if (response.ok) {
					console.log("response is ok!: ", response.statusText);
				} else {
					console.log("shit, went wrong: ", response.statusText);
					console.log(response, " and ", response.text());
				}
			} catch (error) {
				console.log("some unknown error: ", error);
			}
			actions.fetchUserImages();
		},
		fetchDeleteUserImage: async id => {
			console.log("we gonna try and delete an user image");
			try {
				let response = await fetch(APIurl + "/" + id, {
					method: "DELETE"
				});
				if (response.ok) {
					console.log("deleted!!");
				} else {
					console.log("something went wrong: ", response.statusText);
				}
			} catch (error) {
				console.log("some unknown error: ", error);
			}
			actions.fetchUserImages();
		}
	};
	useEffect(() => {
		console.log("running first render effect on image context");
		actions.fetchUserImages();
	}, []);
	return (
		<ImageContext.Provider value={{ store, actions }}>
			{props.children}
		</ImageContext.Provider>
	);
};

export default ImageContextProvider;

ImageContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
