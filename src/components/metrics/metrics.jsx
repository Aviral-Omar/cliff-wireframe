import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Pagination, Layout } from 'antd';

import Chart from './metrics-chart';
import Explorer from './metrics-explorer';

const { Content, Sider } = Layout;

const Metrics = props => {
	const [metrics, setMetrics] = useState([]);
	const [tsData, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [metricsCount, setCount] = useState(0);
	const [pageSize, setSize] = useState(6);

	const { setTitle, collapsed } = props;

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
		setMetrics([]);
		const getMetrics = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/metrics?page=${page}&page_size=${pageSize}`,
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
	}, [page, pageSize]);

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

	const pageChangeHandler = (pageNumber, size) => {
		setPage(pageNumber);
		setSize(size);
	};

	return (
		<Layout style={{ marginLeft: `${collapsed ? 80 : 200}px` }}>
			<Content
				style={{
					marginTop: '64px',
					padding: '0px 40px',
					overflow: 'auto',
					height: 'calc(100vh - 64px)',
				}}
			>
				{metrics.map((metric, index) => (
					<Chart metric={metric} tsData={tsData[index]} key={metric._id} />
				))}
				<Row justify="center">
					<Pagination
						style={{ paddingBottom: '48px' }}
						pageSize={pageSize}
						pageSizeOptions={['6', '10', '20']}
						total={metricsCount}
						current={page}
						onChange={pageChangeHandler}
						showSizeChanger
					/>
				</Row>
			</Content>
			<Explorer {...props} streamId={metrics?.[0]?._source.stream_id} />
		</Layout>
	);
};

export default Metrics;
