import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Chart from './metrics-chart';

const Metrics = props => {
	const [metrics, setMetrics] = useState([]);
	const [tsData, setData] = useState([]);

	const { setTitle } = props;

	const signOut = () => props.removeToken();

	useEffect(() => {
		const getMetrics = async () => {
			const response = await axios.get('http://localhost:8080/metrics', {
				headers: {
					Authorization: props.authToken,
				},
			});
			if (response.status === 200) {
				return response.data;
			}
			return signOut();
		};
		const getTSData = async () => {
			const meta = await getMetrics();
			setMetrics(meta);
			const ids = [];
			meta.forEach(metric => ids.push(metric._id));
			const response = await axios.post('http://localhost:8080/metrics', ids, {
				headers: {
					Authorization: props.authToken,
				},
			});
			if (response.status === 200) {
				return setData(response.data);
			}
			return signOut();
		};
		getTSData();
		setTitle('Metrics');
	}, []);

	return metrics?.map((metric, index) => (
		<Chart metric={metric} tsData={tsData[index]} key={metric._id} />
	));
};

export default Metrics;
