import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import axios from 'axios';
import Home from '../components/home/home';
import Metrics from '../components/metrics/metrics';
import Streams from '../components/streams/streams';
import Sidebar from '../components/sidebar';
import Titlebar from '../components/titlebar';

const { Content } = Layout;

const Main = props => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [collapsed, setCollapsed] = useState(true);
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
			<Sidebar {...props} name={name} collapsed={collapsed} setCollapsed={setCollapsed} />
			<Layout>
				<Titlebar title={title} style={{ marginLeft: `${collapsed ? 80 : 200}px` }} />
				<Content
					style={{
						marginTop: '80px',
						marginLeft: `${collapsed ? 80 : 200}px`,
						padding: '0px 40px',
					}}
				>
					<Switch>
						<Route exact path={[path, `${path}home`]}>
							<Home name={name} setTitle={setTitle} />
						</Route>
						<Route path={`${path}metrics`}>
							<Metrics setTitle={setTitle} />
						</Route>
						<Route path={`${path}streams`}>
							<Streams {...props} setTitle={setTitle} />
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Main;
