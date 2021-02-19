import React from "react";
import PropTypes from "prop-types";

const ImageCard = ({ image, url, onDelete }) => {
	return (
		<div className="image-card">
			<div className="image-card-title">
				{image.title}
				<span className="delete-image-button ml-4" onClick={onDelete} />
			</div>
			<div className="image-card-img-box">
				<img src={image.image_url} />
				{/* <img src={url + "/" + image.image_url} /> */}
			</div>
		</div>
	);
};

export default ImageCard;

ImageCard.propTypes = {
	image: PropTypes.object,
	url: PropTypes.string,
	onDelete: PropTypes.func
};
