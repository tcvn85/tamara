import React from "react";
import Logo  from "./../../assets/logo.png";
import LoginBannerMobile  from "./../../assets/login-bg-m.png";

const Login = props => {
	return (
		<div className="login-page">
			<div className="login-cl"></div>
			<div className="login-cr">
				<div className="logo text-center p-3">
					<img src={Logo} alt="Tamara" />
				</div>
				<div className="login-banner">
					<img src={LoginBannerMobile} alt="" />
				</div>
				<div className="login-cf m-auto">
					<h1 >Login</h1>
					<p>Enter your mobile number to receive a verification code.</p>
					<form >
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login;
