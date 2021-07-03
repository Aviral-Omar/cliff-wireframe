import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Avatar } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const Streams = props => {
	const [streams, setStreams] = useState([]);
	const { removeToken, setTitle } = props;
	setTitle('Streams');

	const signOut = () => removeToken();
	useEffect(() => {
		const getStreams = async () => {
			const response = await axios.get('http://localhost:8080/streams', {
				headers: {
					Authorization: props.authToken,
				},
			});
			if (response.status === 200) {
				return setStreams(response.data);
			}
			return signOut();
		};
		getStreams();
	}, []);

	return (
		<Content style={{ marginTop: '80px', padding: '0px 40px' }}>
			<Card>
				<Card.Meta
					avatar={<Avatar src={streams[0]?.source.logoUrl} shape="circle" size="large" />}
					title={streams[0]?.source.name}
					description={streams[0]?.source.description}
				/>
			</Card>
		</Content>
	);
};

export default Streams;
