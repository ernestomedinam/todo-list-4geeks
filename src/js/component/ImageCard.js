import React from "react";
import PropTypes from "prop-types";

const ImageCard = ({ image }) => {
	return (
		<div className="image-card">
			<div className="image-card-title">{image.title}</div>
			<div className="image-card-img-box">
				<img src={image.url} />
			</div>
		</div>
	);
};

export default ImageCard;

ImageCard.propTypes = {
	image: PropTypes.object
};
