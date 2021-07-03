import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import axios from 'axios';
import Home from '../components/home/home';
import Metrics from '../components/metrics/metrics';
import Streams from '../components/streams/streams';
import Sidebar from '../components/sidebar';
import Titlebar from '../components/titlebar';

const Main = props => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const { path } = useRouteMatch();

	const signOut = () => props.removeToken();

	useEffect(() => {
		const getName = async () => {
			const response = await axios.get('http://localhost:8080/user-name', {
				headers: {
					Authorization: props.authToken,
				},
			});
			if (response.status === 200) {
				return setName(response.data);
			}
			return signOut();
		};
		getName();
	}, []);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar {...props} name={name} />
			<Layout>
				<Titlebar title={title} />
				<Switch>
					<Route exact path={[`${path}`, `${path}home`]}>
						<Home name={name} setTitle={setTitle} />
					</Route>
					<Route path={`${path}metrics`}>
						<Metrics setTitle={setTitle} />
					</Route>
					<Route path={`${path}streams`}>
						<Streams {...props} setTitle={setTitle} />
					</Route>
				</Switch>
			</Layout>
		</Layout>
	);
};

export default Main;
