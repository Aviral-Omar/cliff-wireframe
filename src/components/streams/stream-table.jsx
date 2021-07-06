import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StreamTable = props => {
	const query = new URLSearchParams(useLocation().search);

	const { authToken, removeToken } = props;

	const signOut = () => removeToken();

	useEffect(() => {
		const getTableData = async () => {
			const response = await axios.get(
				`http://localhost:8080/streams?id=${query.get('id')}`,
				{
					headers: {
						Authorization: authToken,
					},
				},
			);
			if (response.status === 200) {
				return response;
			}
			return signOut();
		};
		console.log(getTableData());
	}, []);
	return <div />;
};

export default StreamTable;
