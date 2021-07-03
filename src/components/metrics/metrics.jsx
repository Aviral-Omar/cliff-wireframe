import React from 'react';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Metrics = props => {
	const { setTitle } = props;
	setTitle('Metrics');

	return <Content style={{ marginTop: '80px', padding: '0px 40px' }} />;
};

export default Metrics;
