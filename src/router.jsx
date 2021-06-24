import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SignUpForm from './views/sign-up';
import SignInForm from './views/sign-in';
import Main from './views/main';

const App = () => {
	const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

	const setToken = token => {
		localStorage.setItem('authToken', token);
		setAuthToken(token);
		return token;
	};

	const removeToken = () => {
		localStorage.removeItem('authToken');
		setAuthToken(null);
		return null;
	};

	return (
		<Router>
			<Switch>
				<Route path="/sign-up">{authToken ? <Redirect to="/" /> : <SignUpForm />}</Route>
				<Route path="/sign-in">
					{authToken ? <Redirect to="/" /> : <SignInForm setToken={setToken} />}
				</Route>
				<Route path="/">
					{!authToken ? (
						<Redirect to="/sign-in" />
					) : (
						<Main authToken={authToken} removeToken={removeToken} />
					)}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
