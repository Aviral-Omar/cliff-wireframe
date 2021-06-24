import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUpForm from './views/sign-up';
import SignInForm from './views/sign-in';
import Main from './views/main';

const App = () => (
	<Router>
		<Switch>
			<Route path="/sign-up">
				<SignUpForm />
			</Route>
			<Route path="/sign-in">
				<SignInForm />
			</Route>
			<Route path="/">
				<Main />
			</Route>
		</Switch>
	</Router>
);

export default App;
