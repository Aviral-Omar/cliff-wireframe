import React from 'react';
import { Layout, Menu, Avatar, Row, Col, Typography, Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = props => {
	const { name, collapsed, setCollapsed } = props;

	const signOut = () => props.removeToken();

	return (
		<Sider
			width={200}
			collapsedWidth={80}
			collapsible
			defaultCollapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			theme="dark"
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'fixed',
				left: 0,
				zIndex: 2,
			}}
		>
			<Row justify="space-around" align="middle" style={{ margin: '16px 0px' }}>
				<Avatar shape="square" size={56}>
					USER
				</Avatar>
				{collapsed ? null : (
					<Col>
						<Typography.Title level={4} style={{ marginBottom: '0px', color: 'white' }}>
							{name}
						</Typography.Title>
						<Button type="text" onClick={signOut} style={{ color: 'white' }}>
							Sign Out
						</Button>
					</Col>
				)}
			</Row>
			<Menu theme="dark">
				<Menu.Item key={1} icon={<HomeOutlined />}>
					<Link to="/home">Home</Link>
				</Menu.Item>
				<Menu.Item key={2} icon={<UnorderedListOutlined />}>
					<Link to="/metrics">Metrics</Link>
				</Menu.Item>
				<Menu.Item key={3} icon={<AreaChartOutlined />}>
					<Link to="/streams">Streams</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
