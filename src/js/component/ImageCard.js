import React from "react";
import PropTypes from "prop-types";

const ImageCard = ({ image, url }) => {
	return (
		<div className="image-card">
			<div className="image-card-title">{image.title}</div>
			<div className="image-card-img-box">
				<img src={url + "/" + image.image_url} />
			</div>
		</div>
	);
};

export default ImageCard;

ImageCard.propTypes = {
	image: PropTypes.object,
	url: PropTypes.string
};
