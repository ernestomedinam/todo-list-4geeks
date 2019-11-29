//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import Layout from "./Layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
