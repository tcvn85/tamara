import React, {  useEffect, useState, useMemo, createRef } from "react";
import { useForm } from 'react-hook-form';
import { Link, Redirect } from "react-router-dom";
import Countdown from "react-countdown-now";
import LoginHeader from "components/login-header";
import LoginFooter from "components/login-footer";

import LoginBannerMobile  from "assets/login-bg-m.png";
import LoginBannerDesktop  from "assets/login-bg-d.png";

const inputLength = 6;

const VerificationCode = props => {
	
	// const seconds = 60
	const [error, setError] = useState(false);
	const [isValidCode, setIsValidCode] = useState(false);

  const codesRef = useMemo(
    () => Array.from({ 'length': inputLength }).map(() => createRef()),
    []
  );

	const phoneNumber = sessionStorage.getItem('phoneNumber');

	 const rendererCountDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Link to="#" className="active">Reset Verification Code</Link>;
    } else {
      return (        
        <>
        	<span>Reset Verification Code</span> <strong>{minutes}:{seconds}</strong>
        </>
      );
    }
  }

	const { register, handleSubmit, watch } = useForm();
  
	const onSubmit = formData => {
		const code = formData.code.join().replaceAll(',', '');

  	if (code === sessionStorage.getItem('code')) {
  		// sessionStorage.setItem('token', true);
  		props.history.push('/home')
  	} else {
  		setError(true);
  	}
  };

  const handleKeyUp = ( index, e ) => {
  	const { keyCode } = e;
  	e.preventDefault();
  	if(keyCode >= 48 && keyCode <= 57) {
  		codesRef[index].current.value = e.key;
    	if (codesRef[index+1] ) {
    		codesRef[index+1].current.focus();	
    	}
  	}  else if (keyCode === 8) {
  		codesRef[index].current.value = '';
    	if (codesRef[index-1] ) {
    		codesRef[index-1].current.focus();	
    	}
  	} else {
  		codesRef[index].current.value = '';
  	}
  }

  useEffect(() => {
  	document.title = `Verification Code - ${process.env.REACT_APP_SITE_TITLE || 'Tamara'}`;
  	// codesRef[0].current.focus();
  })

  if (phoneNumber === null ) {
  	return <Redirect to="/" />;		
  }

  const otaCode = watch('code');

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
							<span>{sessionStorage.getItem('phoneNumber')}</span>
						</div>
						
						<div className="form-group fg-codes text-center">
							<div className="d-inline-block">
								{
									Array.from({ 'length': inputLength }).map((item, index) => {
										return (
												<input 
													key={index}
													autoFocus={index === 0}
													maxLength="1"
													name={`code[${index}]`}
													ref={(e) => {
										        register(e)
										        codesRef[index].current = e 
										      }}
													onKeyUp={handleKeyUp.bind(this, index)}
													className={`form-control form-control-code form-control-lg ${error ? 'is-invalid' : ''}`}
													onChange={() => {
														setIsValidCode(otaCode && otaCode.indexOf('') < 0  ? false :  true);
													}}
												/>
											)
									})
								}
								{error && <div className="invalid-feedback d-block text-center">
				          Invalid code. Please try again.
				        </div>}
							</div>
							
						</div>
						<div className="form-group">
							<div className="text-center text-resendcode">
								<Countdown
	                date={Date.now() + 10 * 1000}
	                renderer={rendererCountDown.bind(this)}	                
	              />
							</div>
						</div>
						<button disabled={isValidCode} className="btn btn-secondary  w-100 pt-3 pb-3" type="submit">Continue</button>
					</form>

					<LoginFooter />
				</div>
			</div>
		</div>
	)
}

export default VerificationCode;
