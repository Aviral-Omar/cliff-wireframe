import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Divider, Avatar } from 'antd';

const { Meta } = Card;

const StreamCard = props => {
	const { stream, path } = props;
	return (
		<Link to={`${path}?id=${stream.source._id}`} key={stream._id}>
			<Card style={{ borderRadius: '8px', margin: '8px 0px' }}>
				<p>Created By: {stream.user.name}</p>
				<p>
					Monitored / Stored Datapoints:{' '}
					{`${stream.total_points_predicted} / ${stream.total_points_stored}`}
				</p>
				<Divider />
				<Meta
					avatar={<Avatar src={stream.source.logoUrl} shape="circle" size="large" />}
					title={stream.name}
					description={stream.source.description}
				/>
			</Card>
		</Link>
	);
};

export default StreamCard;
