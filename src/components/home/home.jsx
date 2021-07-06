import React, { useEffect } from 'react';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Home = props => {
	const { name, setTitle } = props;

	useEffect(() => setTitle('Home'));

	return (
		<Content style={{ marginTop: '80px', padding: '0px 40px' }}>
			<Title level={1} style={{ marginBottom: '8px' }}>
				Welcome {name.split(' ')[0]}!
			</Title>
		</Content>
	);
};

export default Home;
