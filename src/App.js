import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from 'components/loading';

const Login = lazy(() => import('page/login'));
const VerificationCode = lazy(() => import('page/verification-code'));
const PageNotFound = lazy(() => import('page/404'));


const App = () => {
	return (
  	<Router>
	    <Suspense fallback={<Loading />}>
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
