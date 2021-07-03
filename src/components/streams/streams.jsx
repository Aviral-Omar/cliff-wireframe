import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Avatar } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const Streams = props => {
	const [streams, setStreams] = useState([]);

	const signOut = () => props.removeToken();
	useEffect(() => {
		const getStreams = async () => {
			const response = await axios.get('http://localhost:8080/streams');
			if (response.status === 200) {
				return setStreams(await response.json());
			}
			return signOut();
		};
		getStreams();
	}, []);

	return (
		<Content style={{ padding: '48px 40px' }}>
			<header>
				<Title level={1} style={{ marginBottom: '8px' }}>
					Streams
				</Title>
			</header>
			<Card>
				<Card.Meta
					avatar={<Avatar src={streams[0]?.source.logoUrl} shape="circle" size="large" />}
					title={streams[0]?.source.name}
				/>
			</Card>
		</Content>
	);
};

export default Streams;
