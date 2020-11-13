import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/logo.png";

const LoginHeader = () => (
	<div className="logo text-center">
		<Link to="/"><img src={Logo} alt="Tamara" /></Link>
	</div>
)

export default LoginHeader;