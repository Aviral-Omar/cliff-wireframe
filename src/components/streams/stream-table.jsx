import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';

const StreamTable = props => {
	const [streamData, setStreamData] = useState({});

	const query = new URLSearchParams(useLocation().search);

	const { authToken, removeToken } = props;

	const signOut = () => removeToken();

	useEffect(() => {
		const getTableData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/streams?id=${query.get('id')}`,
					{
						headers: {
							Authorization: authToken,
						},
					},
				);
				if (response.status === 200) {
					setStreamData(response.data);
				} else if (response.status === 401) {
					signOut();
				} else if (response.status === 502) {
					throw Error('Bad Gateway');
				}
			} catch (e) {
				console.log(e);
			}
		};
		getTableData();
	}, []);

	const columns = [
		{
			title: 'Date (UTC)',
			dataIndex: 'timestamp',
			key: 'timestamp',
			fixed: 'left',
			width: 140,
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Purchase Count',
			dataIndex: 'purchase_count',
			key: 'purchase_count',
		},
		{
			title: 'Checkout Failure Count',
			dataIndex: 'checkout_failure_count',
			key: 'checkout_failure_count',
		},
		{
			title: 'Payment API Failure Count',
			dataIndex: 'payment_api_failure_count',
			key: 'payment_api_failure_count',
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={streamData.rows?.map(row => ({
				...row,
				timestamp: new Date(row.timestamp).toUTCString(),
			}))}
			pagination={{
				position: ['bottomCenter'],
				defaultPageSize: 50,
				hideOnSinglePage: true,
			}}
			scroll={{
				scrollToFirstRowOnChange: true,
				x: 'max-content',
				y: '60vh',
			}}
		/>
	);
};

export default StreamTable;
