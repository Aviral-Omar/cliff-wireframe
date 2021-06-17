import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './views/sign-up';
import SignIn from './views/sign-in';

const App = () => (
	<Router>
		<Switch>
			<Route path="/sign-up">
				<SignUp />
			</Route>
			<Route path="/sign-in">
				<SignIn />
			</Route>
		</Switch>
	</Router>
);

export default App;
