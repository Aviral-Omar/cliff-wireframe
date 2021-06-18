import React from 'react';
import { Layout, Menu, Avatar, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
	<Sider
		width={240}
		breakpoint="md"
		collapsedWidth={0}
		collapsible
		trigger={null}
		style={{ backgroundColor: 'white' }}
	>
		<Row justify="space-around" align="middle" style={{ margin: '16px 0px' }}>
			<Avatar shape="square" size={64}>
				USER
			</Avatar>
			<Col>
				<Typography.Title level={4}>Aviral Omar</Typography.Title>
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

export default Sidebar;
