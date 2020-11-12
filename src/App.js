import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('./page/login'));
const VerificationCode = lazy(() => import('./page/verification-code'));
const PageNotFound = lazy(() => import('./page/404'));

const App = () => {
	return (
  	<Router>
	    <Suspense fallback={<div>Loading...</div>}>
	      <Switch>
	        <Route exact path="/" component={Login} />
	        <Route path="/verification-code" component={VerificationCode} />
	        <Route component={PageNotFound} />
	      </Switch>
	    </Suspense>
	  </Router>
  );
}

export default App;
