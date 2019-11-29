import React from "react";

class NewHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "light",
			size: 4
		};
	}
	render() {
		return <h2>Hello New Home</h2>;
	}
}

export default NewHome;
