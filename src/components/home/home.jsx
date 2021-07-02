import React from 'react';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Home = props => {
	const { name } = props;
	return (
		<Content style={{ padding: '48px 40px' }}>
			<Title level={1} style={{ marginBottom: '8px' }}>
				Welcome {name.split(' ')[0]}!
			</Title>
		</Content>
	);
};

export default Home;
