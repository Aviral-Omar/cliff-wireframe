import React, { useEffect } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const Metrics = props => {
	const { setTitle } = props;

	useEffect(() => setTitle('Metrics'));

	return <Content style={{ marginTop: '80px', padding: '0px 40px' }} />;
};

export default Metrics;
