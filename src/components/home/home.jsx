import React, { useEffect } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Home = props => {
	const { name, setTitle } = props;

	useEffect(() => setTitle('Home'));

	return (
		<Title level={1} style={{ marginBottom: '8px' }}>
			Welcome {name.split(' ')[0]}!
		</Title>
	);
};

export default Home;
