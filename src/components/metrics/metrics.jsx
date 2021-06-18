import React from 'react';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Metrics = () => (
	<Content style={{ padding: '48px 40px' }}>
		<header>
			<Title level={1} style={{ marginBottom: '8px' }}>
				Metrics
			</Title>
		</header>
	</Content>
);

export default Metrics;
