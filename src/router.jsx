import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './views/sign-up';

const App = () => (
	<Router>
		<Switch>
			<Route path="/sign-up">
				<SignUp />
			</Route>
		</Switch>
	</Router>
);

export default App;
