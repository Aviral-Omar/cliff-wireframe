import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Pagination } from 'antd';

import Chart from './metrics-chart';

const Metrics = props => {
	const [metrics, setMetrics] = useState([]);
	const [tsData, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [metricsCount, setCount] = useState(0);

	const PAGE_SIZE = 6;

	const { setTitle } = props;

	const signOut = () => props.removeToken();

	useEffect(() => {
		const getTSData = async () => {
			setData([]);
			const ids = [];
			metrics.forEach(metric => ids.push(metric._id));
			if (ids.length) {
				try {
					const response = await axios.post('http://localhost:8080/metrics', ids, {
						headers: {
							Authorization: props.authToken,
						},
					});
					if (response.status === 200) {
						setData(response.data);
					} else if (response.status === 401) {
						signOut();
					} else if (response.status === 502) {
						throw Error('Bad Gateway');
					}
				} catch (e) {
					console.log(e);
				}
			}
		};
		getTSData();
	}, [metrics]);

	useEffect(() => {
		const getMetrics = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/metrics?page=${page}&page_size=${PAGE_SIZE}`,
					{
						headers: {
							Authorization: props.authToken,
						},
					},
				);
				if (response.status === 200) {
					setMetrics(response.data);
				} else if (response.status === 401) {
					signOut();
				} else if (response.status === 502) {
					throw Error('Bad Gateway');
				}
			} catch (e) {
				console.log(e);
			}
		};
		getMetrics();
	}, [page]);

	useEffect(() => {
		const getCount = async () => {
			try {
				const response = await axios.get('http://localhost:8080/metrics/count', {
					headers: {
						Authorization: props.authToken,
					},
				});
				if (response.status === 200) {
					setCount(response.data);
				} else if (response.status === 401) {
					signOut();
				} else if (response.status === 502) {
					throw Error('Bad Gateway');
				}
			} catch (e) {
				console.log(e);
			}
		};
		setTitle('Metrics');
		getCount();
	}, []);

	const pageChangeHandler = pageNumber => {
		setPage(pageNumber);
	};

	return (
		<Row justify="center">
			<Col span={24} xxl={15} xl={16} lg={16} flex="">
				{metrics.map((metric, index) => (
					<Chart metric={metric} tsData={tsData[index]} key={metric._id} />
				))}
				<Row justify="center">
					<Pagination
						style={{ padding: '48px 0px' }}
						pageSize={PAGE_SIZE}
						total={metricsCount}
						onChange={pageChangeHandler}
					/>
				</Row>
			</Col>
		</Row>
	);
};

export default Metrics;
