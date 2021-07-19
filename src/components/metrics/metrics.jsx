import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Pagination, Layout } from 'antd';

import Chart from './metrics-chart';
import Explorer from './metrics-explorer';

const { Content, Sider } = Layout;

const Metrics = props => {
	const [streamId, setId] = useState('');
	const [stream, setStream] = useState({});
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
		if (Object.keys(stream).length !== 0) {
			const f = {};
			stream.meta.dimensions.forEach(dimension => {
				f[dimension] = [];
			});
			setSelected(f);
		}
	}, [stream]);

	useEffect(() => {
		const getStream = async () => {
			if (streamId) {
				try {
					const response = await axios.post(
						'http://localhost:8080/streams',
						{ id: streamId },
						{
							headers: {
								Authorization: props.authToken,
							},
						},
					);
					setStream(response.data);
				} catch (e) {
					if (e.response.status === 401) {
						signOut();
						console.log('Unauthenticated');
					} else {
						console.log('Bad Gateway');
					}
				}
			}
		};
		getStream();
	}, [streamId]);

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
					if (e.response.status === 401) {
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
				setId(response.data?.[0]?._source.stream_id);
				setMetrics(response.data);
			} catch (e) {
				if (e.response.status === 401) {
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
				if (e.response.status === 401) {
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
				stream={stream}
				filters={filters}
				setFilters={setFilters}
				selectedFilters={selectedFilters}
				setSelected={setSelected}
			/>
		</Layout>
	);
};

export default Metrics;
