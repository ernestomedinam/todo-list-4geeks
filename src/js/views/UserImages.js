import React, { useContext } from "react";
import { ImageContext } from "../store/ImageContext";
import ImageCard from "../component/ImageCard";

const UserImages = props => {
	const { store, actions } = useContext(ImageContext);
	return (
		<div className="container">
			<h1>{"welcome to user images"}</h1>
			<div className="image-container">
				{store.userImages.map(image => {
					return (
						<div key={image.id} className="col col-md-4">
							<ImageCard image={image} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UserImages;
