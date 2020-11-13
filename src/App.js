import React, { Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Loading from 'components/loading';
import history from './helpers/history';

const Login = lazy(() => import('page/login'));
const VerificationCode = lazy(() => import('page/verification-code'));
const PageNotFound = lazy(() => import('page/404'));
const Home = lazy(() => import('page/home'));


const App = () => {
	return (
  	<Router history={history}>
	    <Suspense fallback={<Loading />}>
	      <Switch>
	        <Route exact path="/" component={Login} />
	        <Route path="/verification-code" component={VerificationCode} />
	        <Route path="/home" component={Home} />
	        <Route component={PageNotFound} />
	      </Switch>
	    </Suspense>
	  </Router>
  );
}

export default App;
