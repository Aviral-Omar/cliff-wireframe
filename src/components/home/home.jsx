import React from 'react';
import { Layout, Typography, Input, Space } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => (
	<Content style={{ padding: '48px 40px' }}>
		<Space direction="vertical" size="large">
			<header>
				<Title level={1} style={{ marginBottom: '8px' }}>
					Home
				</Title>
				<Title level={4} style={{ marginTop: '8px' }}>
					Hello User! You can search your metrics below.
				</Title>
			</header>
			<Input size="large" />
		</Space>
	</Content>
);

export default Home;
