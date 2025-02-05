import React from 'react';
import { Link } from "react-router-dom";
import LoginHeader from "components/login-header";

const PageNotFound = props => {

	
	return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="text-center">
					<LoginHeader />
					<h1>404!</h1>
					<Link to="/">Login</Link>
				</div>
			</div>
		)
}

export default PageNotFound;