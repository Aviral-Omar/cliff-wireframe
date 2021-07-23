import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Pagination, Layout } from 'antd';

import Chart from './metrics-chart';
import Explorer from './metrics-explorer';

const { Content } = Layout;

const Metrics = props => {
	const [streams, setStreams] = useState([]);
	const [metrics, setMetrics] = useState([]);
	const [selectedFilters, setSelected] = useState({});
	const [filters, setFilters] = useState({});
	const [tsData, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [metricsCount, setCount] = useState(0);
	const [pageSize, setSize] = useState(6);

	const { setTitle, collapsed } = props;

	const signOut = () => props.removeToken();

	useEffect(() => {
		if (streams) {
			const f = {};
			streams?.forEach(stream => {
				f[stream.name] = {};
				stream.meta.dimensions.forEach(dimension => {
					f[stream.name][dimension] = [];
				});
			});
			setSelected(f);
		}
	}, [streams]);

	useEffect(() => {
		const getStreams = async () => {
			try {
				const response = await axios.get('http://localhost:8080/streams', {
					headers: {
						Authorization: props.authToken,
					},
				});
				setStreams(response.data);
			} catch (e) {
				if (e.response?.status === 401) {
					signOut();
					console.log('Unauthenticated');
				} else {
					console.log('Bad Gateway');
				}
			}
		};
		getStreams();
	}, []);

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
					setData(response.data);
				} catch (e) {
					if (e.response?.status === 401) {
						signOut();
						console.log('Unauthenticated');
					} else {
						console.log('Bad Gateway');
					}
				}
			}
		};
		getTSData();
	}, [metrics]);

	useEffect(() => {
		setMetrics([]);
		const getMetrics = async () => {
			try {
				const response = await axios.post(
					`http://localhost:8080/metrics?page=${page}&page_size=${pageSize}`,
					filters,
					{
						headers: {
							Authorization: props.authToken,
						},
					},
				);
				setMetrics(response.data);
			} catch (e) {
				if (e.response?.status === 401) {
					signOut();
					console.log('Unauthenticated');
				} else {
					console.log('Bad Gateway');
				}
			}
		};
		getMetrics();
	}, [page, pageSize, filters]);

	useEffect(() => {
		const getCount = async () => {
			try {
				const response = await axios.post('http://localhost:8080/metrics/count', filters, {
					headers: {
						Authorization: props.authToken,
					},
				});
				setCount(response.data);
				setPage(1);
			} catch (e) {
				if (e.response?.status === 401) {
					signOut();
					console.log('Unauthenticated');
				} else {
					console.log('Bad Gateway');
				}
			}
		};
		setTitle('Metrics');
		getCount();
	}, [filters]);

	const pageChangeHandler = (pageNumber, size) => {
		setPage(pageNumber);
		setSize(size);
	};

	return (
		<Layout style={{ marginLeft: `${collapsed ? 80 : 200}px`, height: 'calc(100vh - 64px)' }}>
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
			<Explorer
				{...props}
				streams={streams}
				filters={filters}
				setFilters={setFilters}
				selectedFilters={selectedFilters}
				setSelected={setSelected}
			/>
		</Layout>
	);
};

export default Metrics;
