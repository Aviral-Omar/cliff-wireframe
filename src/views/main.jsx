import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Home from '../components/home/home';
import Metrics from '../components/metrics/metrics';
import Sidebar from '../components/sidebar';

const Main = props => {
	const { path } = useRouteMatch();
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar {...props} />
			<Switch>
				<Route exact path={[`${path}`, `${path}home`]}>
					<Home />
				</Route>
				<Route path={`${path}metrics`}>
					<Metrics />
				</Route>
			</Switch>
		</Layout>
	);
};

export default Main;
