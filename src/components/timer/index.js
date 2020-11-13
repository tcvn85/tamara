import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Timer = (props) => {

  const {initialMinute = 0,initialSeconds = 0} = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);

  useEffect(() => {
	  const myInterval = setInterval(() => {
	    if (seconds > 0) {
        setSeconds(seconds - 1);
        // props.onTimeOver(false);
	    }
	    if (seconds === 0) {
        if (minutes === 0) {
        	// props.onTimeOver(true);
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
	    } 
	}, 1000)
	return () => {
	  clearInterval(myInterval);
	};
});

return (
    <div>
    { minutes === 0 && seconds === 0
        ? <Link to="#" className="active">Reset Verification Code</Link>
        : (
        	<div>
        		<span>Reset Verification Code</span>{" "}
        		<strong>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</strong>
        	</div>
        )
    }
    </div>
  )
}

export default Timer;