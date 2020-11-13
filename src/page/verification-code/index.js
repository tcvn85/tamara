import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import LoginHeader from "components/login-header";
import LoginFooter from "components/login-footer";
// import { yupResolver } from '@hookform/resolvers';
// import * as Yup from "yup";
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

const VerificationCode = props => {
	const seconds = 120;
	


	 const rendererCountDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return '';
    } else {
      return (        
        <strong>{minutes}:{seconds}</strong>
      );
    }
  }

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
						<h1>Verification Code</h1>
						
						<div className="form-group">
							Enter the 6 digits code we sent to your mobile no.<br />
							<span>+8477 77 77888</span>
						</div>
						
						<div className="form-group fg-codes text-center">
							<div className="d-inline-block">
								<input required autoFocus={true} autoComplete="off" className="is-invalid form-control form-control-code form-control-lg" name="code1" />
								<input required autoComplete="off" autoComplete="off" className="is-invalid form-control form-control-code form-control-lg" name="code2" />
								<input required autoComplete="off" autoComplete="off" className="is-invalid form-control form-control-code form-control-lg" name="code3" />
								<input required autoComplete="off" autoComplete="off" className="form-control form-control-code form-control-lg" name="code4" />
								<input required autoComplete="off" autoComplete="off" className="form-control form-control-code form-control-lg" name="code5" />
								<input required autoComplete="off" autoComplete="off" className="form-control form-control-code form-control-lg" name="code6" />
								<div className="invalid-feedback text-left">
				          Invalid code. Please try again.
				        </div>
							</div>
							
						</div>
						<div className="form-group">
							<div className="text-center text-resendcode">
								<Link to="#" className="activeA1">Reset Verification Code </Link>
								<Countdown
	                date={Date.now() + seconds * 1000}
	                renderer={rendererCountDown.bind(this)}
	                onComplete={() => {}}
	              />

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

export default VerificationCode;
