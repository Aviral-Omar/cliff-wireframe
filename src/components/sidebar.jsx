import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = props => {
	const [name, setName] = useState('');

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
		<Sider
			width={240}
			breakpoint="md"
			collapsedWidth={0}
			collapsible
			style={{ backgroundColor: 'white' }}
		>
			<Row justify="space-around" align="middle" style={{ margin: '16px 0px' }}>
				<Avatar shape="square" size={64}>
					USER
				</Avatar>
				<Col>
					<Typography.Title level={4} style={{ marginBottom: '0px' }}>
						{name}
					</Typography.Title>
					<Button type="text" onClick={signOut}>
						Sign Out
					</Button>
				</Col>
			</Row>
			<Menu>
				<Menu.Item key={1}>
					<Link to="/home">Home</Link>
				</Menu.Item>
				<Menu.Item key={2}>
					<Link to="/metrics">Metrics</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
