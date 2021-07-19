import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { DateTime } from 'luxon';

const StreamTable = props => {
	const [streamData, setStreamData] = useState({});
	const [columns, setColumns] = useState([]);

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
				setStreamData(response.data);
			} catch (e) {
				if (e.response.status === 401) {
					signOut();
					console.log('Unauthenticated');
				} else {
					console.log('Bad Gateway');
				}
			}
		};
		getTableData();
	}, []);

	useEffect(() => {
		if (Object.keys(streamData).length !== 0) {
			setColumns([
				{
					title: 'Date (UTC)',
					dataIndex: 'timestamp',
					key: 'timestamp',
					fixed: 'left',
					width: 168,
				},
				...streamData?.fields?.flatMap(field =>
					field.name !== 'timestamp'
						? [
								{
									title: field.name,
									dataIndex: field.name,
									key: field.columnID,
									ellipsis: true,
								},
						  ]
						: [],
				),
			]);
		}
	}, [streamData]);

	return (
		<Table
			columns={columns}
			dataSource={streamData.rows?.map((row, index) => ({
				...row,
				timestamp: DateTime.fromISO(row.timestamp).toLocaleString(DateTime.DATETIME_MED),
				key: index,
			}))}
			pagination={{
				position: ['bottomCenter'],
				defaultPageSize: 50,
				hideOnSinglePage: true,
			}}
			scroll={{
				scrollToFirstRowOnChange: true,
				x: 'max-content',
				y: 'calc(100vh - 240px)',
			}}
		/>
	);
};

export default StreamTable;
