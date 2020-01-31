import React, { createContext } from 'react';
import PropTypes from "prop-types";
import imageReducer from "./imageReducer"

export const ImageContext = createContext(null);

const ImageContextProvider = (props) => {
    const [store, dispatch] = useReducer(imageReducer, {
        userImages: []
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
}

export default ImageContextProvider;

ImageContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}