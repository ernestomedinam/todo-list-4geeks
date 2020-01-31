import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import imageReducer from "./imageReducer";

export const ImageContext = createContext(null);

const ImageContextProvider = props => {
	const [store, dispatch] = useReducer(imageReducer, {
		userImages: [
			{
				id: 1,
				title: "image 01",
				url: "https://via.placeholder.com/256"
			},
			{
				id: 2,
				title: "Image 02",
				url: "https://via.placeholder.com/512"
			}
		]
	});
	const actions = {
		fetchUserImages: () => {},
		fetchUploadUserImage: () => {}
	};
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
