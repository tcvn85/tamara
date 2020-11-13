import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import LoginHeader from "components/login-header";
import LoginFooter from "components/login-footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import flagVi from "assets/vi-flag.png";
import flagEn from "assets/en-flag.png";
import LoginBannerMobile  from "assets/login-bg-m.png";
import LoginBannerDesktop  from "assets/login-bg-d.png";

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .required("This is a required field.")
    .matches(/^[0-9]+$/, "Must be only digits")
		.min(8, 'Must be exactly 8 digits')
		.max(8, 'Must be exactly 8 digits')
});

const Login = props => {

	const refPhone = useRef(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [countryCode, setCountryCode] = useState('+84');
	

	const { register, handleSubmit, errors, ref } = useForm({
    resolver: yupResolver(formSchema)
  });

	const onSubmit = data => {
  	
  };

  const handleSelectDDItem = (value) => {
  	setDropdownOpen(!dropdownOpen);
  	setCountryCode(value);
  	useRef.current.focus();
  }

	return (
		<div className="login-layout">
			<div className="login-cl" style={{"backgroundImage": `url(${LoginBannerDesktop})`}}></div>
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
					    		<div className="dropdown-value" onClick={() => setDropdownOpen(!dropdownOpen)}>
					    			<img src={flagVi} alt="Vi" />
					    			<input 
					    				readOnly 
					    				className="form-control form-control-lg" 
					    				value={countryCode} 
					    				name="countryCode" 
					    			/>
					    			<span className={`arrow ${dropdownOpen ? "up" : "down"}`}></span>
					    		</div>
					    		<ul style={{"display": dropdownOpen ? "block": "none"}}>
					    			<li onClick={handleSelectDDItem.bind(this, "+84")}>
					    				<img className={`mr-2 ${countryCode === '+84' ? 'selected' : ''}`} src={flagVi} alt="Vi" /> 
					    				<span className="country-code">+84</span> <span className="country-name">Vienamese</span>
				    				</li>
					    			<li onClick={handleSelectDDItem.bind(this, "+01")}>
					    				<img className={`mr-2 ${countryCode === '+01' ? 'selected' : ''}`} src={flagEn} alt="En" /> 
					    				<span className="country-code">+01</span> <span className="country-name">US</span>
				    				</li>
					    		</ul>
					    	</div>

					    </div>
					    <div className="col-7">
					      <input 
					      	autoComplete="off" 
					      	name="phone" 
					      	ref={(e) => {
						        register(e)
						        useRef.current = e 
						      }}
					      	className={`form-control form-control-phone form-control-lg ${errors.phone ? 'invalid-feedback' : ''}`}
					      />
					    </div>
						</div>

						{errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}

						<button className="btn btn-secondary  w-100 pt-3 pb-3" type="submit" disabled="disabled">Continue</button>
					</form>

					<LoginFooter />
				</div>
			</div>
		</div>
	)
}

export default Login;
