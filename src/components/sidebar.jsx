import React, { useState } from 'react';
import { Layout, Menu, Avatar, Row, Col, Typography, Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = props => {
	const [collapsed, setCollapsed] = useState(true);
	const { name } = props;

	const signOut = () => props.removeToken();

	return (
		<Sider
			width={200}
			collapsedWidth={80}
			collapsible
			defaultCollapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			style={{ backgroundColor: 'white' }}
		>
			<Row justify="space-around" align="middle" style={{ margin: '16px 0px' }}>
				<Avatar shape="square" size={64}>
					USER
				</Avatar>
				{collapsed ? null : (
					<Col>
						<Typography.Title level={4} style={{ marginBottom: '0px' }}>
							{name}
						</Typography.Title>
						<Button type="text" onClick={signOut}>
							Sign Out
						</Button>
					</Col>
				)}
			</Row>
			<Menu>
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
