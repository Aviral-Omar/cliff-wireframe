import React, { useState, useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Layout, Card, Avatar, Divider } from 'antd';
import axios from 'axios';

import StreamTable from './stream-table';

const { Content } = Layout;
const { Meta } = Card;

const Streams = props => {
	const [streams, setStreams] = useState([]);
	const { removeToken, setTitle } = props;
	const { path } = useRouteMatch();
	const location = useLocation();

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
		setTitle('Streams');
	}, []);

	return (
		<Content style={{ marginTop: '80px', padding: '0px 40px' }}>
			{location.search ? (
				<StreamTable {...props} location={location} />
			) : (
				streams?.map(stream => (
					<Link to={`${path}?id=${stream.source._id}`} key={stream._id}>
						<Card style={{ borderRadius: '8px', margin: '8px 0px' }}>
							<p>Created By: {stream.user.name}</p>
							<p>
								Monitored / Stored Datapoints:{' '}
								{`${stream.total_points_predicted} / ${stream.total_points_stored}`}
							</p>
							<Divider />
							<Meta
								avatar={
									<Avatar
										src={stream.source.logoUrl}
										shape="circle"
										size="large"
									/>
								}
								title={stream.name}
								description={stream.source.description}
							/>
						</Card>
					</Link>
				))
			)}
		</Content>
	);
};

export default Streams;
