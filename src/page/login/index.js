import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginHeader from "components/login-header";
import LoginFooter from "components/login-footer";
import { getEnv, logError, getBaseUrl } from "helpers/utils";
import Loading from "components/loading";

import flagVi from "assets/vi-flag.png";
import flagEn from "assets/en-flag.png";
import LoginBannerMobile  from "assets/login-bg-m.png";
import LoginBannerDesktop  from "assets/login-bg-d.png";

const schema = yup.object().shape({
  phoneNumber: yup.string()
  	.required('This is required field')
    .min(8, 'Must be exactly 8 digits')
});

const Login = props => {

	const phoneNumberRef = useRef();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [countryFlag, setCountryFlag] = useState(flagVi);
	const [isSubmit, setIsSubmit] = useState(true);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(false);


  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      countryCode: "+84",
      phoneNumber: ""
    }
  });
  // get form status
  // const { isValid } = formState;

	const onSubmit = formData => {

  	const phone = formData.countryCode.trim() + formData.phoneNumber.trim();
  	
  	setIsFetching(true);

  	const url = getBaseUrl() + `data.json`;
  	
  	// test data check number
    fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => response.json())
        .then(result => {
        	
          if (result) {
          	const phoneExist = result.phoneNumbers.filter(p => p === phone);
          	if (phoneExist.length > 0) {
          		const codeExist = result.codes.filter(c => phoneExist[0].indexOf(c) >= 0);
          		if (codeExist.length > 0) {
          			sessionStorage.setItem('code',  codeExist[0]);
          			sessionStorage.setItem('phoneNumber',  phoneExist[0]);
          			props.history.push('/verification-code');
          		}
          	}
          }
          setIsFetching(false);
          setError(true);
        }).catch(error => {
        	setIsFetching(false);
          logError(error);
        });
  };

  const handleSelectDDItem = (value, flag) => {
  	setDropdownOpen(!dropdownOpen);
  	setValue('countryCode', value);
  	setCountryFlag(flag);
  	phoneNumberRef.current.focus();
  }

  useEffect(() => {
    document.title = `Login - ${getEnv('REACT_APP_SITE_TITLE') || 'Tamara'}`;
  });

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
						
						<div className="row position-relative">
							{isFetching && <Loading />}
					    <div className="col-5 position-static pr-0">
					    	<div className="dropdown-select">
					    		<div className="dropdown-value" onClick={() => setDropdownOpen(!dropdownOpen)}>
					    			<img src={countryFlag} alt="Vi" />
					    			<input 
					    				className="form-control form-control-lg" 
					    				name="countryCode"
					    				readOnly
					    				ref={register}
					    			/>
					    			<span className={`arrow ${dropdownOpen ? "up" : "down"}`}></span>
					    		</div>
					    		<ul style={{"display": dropdownOpen ? "block": "none"}}>
					    			<li onClick={handleSelectDDItem.bind(this, "+84", flagVi)}>
					    				<img className={`mr-2 ${getValues('countryCode') === '+84' ? 'selected' : ''}`} src={flagVi} alt="Vi" /> 
					    				<span className="country-code">+84</span> <span className="country-name">Vienamese</span>
				    				</li>
					    			<li onClick={handleSelectDDItem.bind(this, "+01", flagEn)}>
					    				<img className={`mr-2 ${getValues('countryCode') === '+01' ? 'selected' : ''}`} src={flagEn} alt="En" /> 
					    				<span className="country-code">+01</span> <span className="country-name">US</span>
				    				</li>
					    		</ul>
					    	</div>

					    </div>
					    <div className="col-7">
					      <input 
					      	autoComplete="off" 
					      	name="phoneNumber"
					      	type="number"
					      	onChange={(e) => {
					      		setIsSubmit(e.target.value.trim().length >= 8 ? false : true);
					      		setError(false);
					      	}}
				      		ref={(e) => {
						        register(e)
						        phoneNumberRef.current = e 
						      }}
					      	className={`form-control form-control-phone form-control-lg ${errors.phoneNumber || error ? 'is-invalid' : ''}`}
					      />
					    </div>
						</div>

						{errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber.message}</div>}
						{error && <div className="invalid-feedback d-block">Your phone number is not correct.</div>}

						<button className="btn btn-secondary mt-4 w-100 pt-3 pb-3" type="submit" disabled={isSubmit}>Continue</button>
					</form>

					<LoginFooter />
				</div>
			</div>
		</div>
	)
}

export default Login;
