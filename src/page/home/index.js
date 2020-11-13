import React from 'react';
import LoginHeader from "components/login-header";

const Homepage = props => {

	
	return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="text-center">
					<LoginHeader />
					<h1>Homepage</h1>
				</div>
			</div>
		)
}

export default Homepage;