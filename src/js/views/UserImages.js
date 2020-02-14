import React, { useContext, useState, useEffect } from "react";
import { ImageContext } from "../store/ImageContext";
import ImageCard from "../component/ImageCard";

const UserImages = props => {
	const { store, actions } = useContext(ImageContext);
	const [uploadedAt, setUploadedAt] = useState("start");
	const [newImage, setNewImage] = useState({
		title: "",
		file: null
	});
	const handleTitleChange = e => {
		setNewImage({
			...newImage,
			title: e.target.value
		});
	};
	const handleImageChange = e => {
		console.log("handling image change: ", e.target.files.length);
		let file = e.target.files[0];
		console.log(file.name);
		setNewImage({
			...newImage,
			file: file
		});
	};
	const handleSubmit = e => {
		e.preventDefault();
		e.stopPropagation();
		let formData = new FormData();
		formData.append("file", newImage.file, newImage.file.name);
		formData.append("title", newImage.title);
		actions.fetchUploadUserImage(formData);
		setNewImage({
			title: "",
			file: null
		});
		setUploadedAt(String(Date.now()));
	};
	return (
		<div className="container">
			<h1>{"welcome to user images"}</h1>

			{store.userImages && (
				<div className="image-container">
					{store.userImages.map(image => {
						return (
							<div key={image.id} className="col col-md-4">
								<ImageCard
									image={image}
									url={store.staticAPIurl}
									onDelete={e =>
										actions.fetchDeleteUserImage(image.id)
									}
								/>
							</div>
						);
					})}
				</div>
			)}

			<div className="image-form">
				<form onSubmit={handleSubmit}>
					<label>
						<input
							type="text"
							placeholder="new image title"
							name="imageTitle"
							onChange={handleTitleChange}
							value={newImage.title}
							required
						/>
					</label>
					<label>
						<input
							type="file"
							name="imageFile"
							accept="image/png image/jpeg image/jpg"
							onChange={handleImageChange}
							key={uploadedAt}
							required
						/>
					</label>
					<button type="submit" className="btn btn-success">
						{"upload new image"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default UserImages;
