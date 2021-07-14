import React, { useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import StreamCard from './stream-card';
import StreamTable from './stream-table';

const Streams = props => {
	const [streams, setStreams] = useState([]);
	const { removeToken, setTitle } = props;
	const { path } = useRouteMatch();
	const location = useLocation();

	const signOut = () => removeToken();
	useEffect(() => {
		const getStreams = async () => {
			try {
				const response = await axios.get('http://localhost:8080/streams', {
					headers: {
						Authorization: props.authToken,
					},
				});
				if (response.status === 200) {
					setStreams(response.data);
				} else if (response.status === 401) {
					signOut();
				} else if (response.status === 502) {
					throw Error('Bad Gateway');
				}
			} catch (e) {
				console.log(e);
			}
		};
		if (!location.search) {
			getStreams();
		}
		setTitle('Streams');
	}, []);

	const component = location.search ? (
		<StreamTable {...props} location={location} />
	) : (
		streams?.map(stream => <StreamCard path={path} stream={stream} key={stream._id} />)
	);
	return <div>{component}</div>;
};

export default Streams;
