import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Home from '../components/home/home';
import Metrics from '../components/metrics/metrics';
import Streams from '../components/streams/streams';
import Sidebar from '../components/sidebar';

const Main = props => {
	const [name, setName] = useState('');
	const { path } = useRouteMatch();

	const signOut = () => props.removeToken();

	useEffect(() => {
		const getName = async () => {
			const response = await fetch('http://localhost:8080/user-name', {
				method: 'GET',
				headers: {
					Authorization: props.authToken,
				},
			});
			if (response.status === 200) {
				return setName(await response.text());
			}
			return signOut();
		};
		getName();
	}, []);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar {...props} name={name} />
			<Switch>
				<Route exact path={[`${path}`, `${path}home`]}>
					<Home name={name} />
				</Route>
				<Route path={`${path}metrics`}>
					<Metrics />
				</Route>
				<Route path={`${path}streams`}>
					<Streams {...props} />
				</Route>
			</Switch>
		</Layout>
	);
};

export default Main;
