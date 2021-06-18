import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './views/sign-up';
import SignIn from './views/sign-in';
import Main from './views/main';

const App = () => (
	<Router>
		<Switch>
			<Route path="/sign-up">
				<SignUp />
			</Route>
			<Route path="/sign-in">
				<SignIn />
			</Route>
			<Route path="/">
				<Main />
			</Route>
		</Switch>
	</Router>
);

export default App;
