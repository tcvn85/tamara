import React from "react";
import { useForm } from "react-hook-form";
import LoginHeader from "components/login-header";
import LoginFooter from "components/login-footer";
// import { yupResolver } from '@hookform/resolvers';
// import * as Yup from "yup";
import flagVi from "assets/vi-flag.png";
import flagEn from "assets/en-flag.png";
import LoginBannerMobile  from "assets/login-bg-m.png";
import LoginBannerDesktop  from "assets/login-bg-d.png";

// const formSchema = Yup.object().shape({
//   resetPassword: Yup.string()
//     .required("This is a required field.")
//     .min(8, "Too Short!"),
//   resetPasswordConfirmation: Yup.string()
//     .when("resetPassword", {
//       is: val => (val && val.length > 0 ? true : false),
//       then: Yup.string().oneOf(
//         [Yup.ref("resetPassword")],
//         "Passwords do not match"
//       )
//     })
//     .required("This is a required field.")
// });

const Login = props => {

	const {  handleSubmit } = useForm({
    // resolver: yupResolver(formSchema)
  });

	const onSubmit = data => {
  	
  };

	return (
		<div className="login-layout">
			<div className="login-cl" style={{'backgroundImage': `url(${LoginBannerDesktop})`}}></div>
			<div className="login-cr d-flex flex-column">
				<LoginHeader />
				
				<div className="login-banner">
					<img src={LoginBannerMobile} alt="" />
				</div>

				<div className="login-cf d-flex flex-column flex-grow-1">
					<form onSubmit={handleSubmit(onSubmit)} className="h-100 flex-grow-1">
						<h1>Login</h1>
						<p>Enter your mobile number to receive a verification code.</p>
						
						<div className="mb-4 row position-relative">
					    <div className="col-5 position-static pr-0">
					    	<div className="dropdown-select">
					    		<div className="dropdown-value">
					    			<img src={flagVi} alt="Vi" />
					    			<input readOnly className="form-control form-control-lg" defaultValue="+84" name="countryCode" />
					    			<span className="arrow down"></span>
					    		</div>
					    		<ul>
					    			<li><img className="mr-2" src={flagVi} alt="Vi" /> <span className="country-code">+84</span> <span className="country-name">Vienamese</span></li>
					    			<li><img className="mr-2" src={flagEn} alt="En" /> <span className="country-code">+01</span> <span className="country-name">US</span></li>
					    		</ul>
					    	</div>

					    </div>
					    <div className="col-7">
					      <input autoComplete="off" className="form-control form-control-phone form-control-lg" name="phone" />
					    </div>
						</div>
						<button className="btn btn-secondary  w-100 pt-3 pb-3" type="submit" disabled="disabled">Continue</button>
					</form>

					<LoginFooter />
				</div>
			</div>
		</div>
	)
}

export default Login;
