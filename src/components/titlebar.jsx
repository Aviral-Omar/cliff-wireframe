import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Titlebar = props => {
	const { title } = props;
	return (
		<Header style={{ position: 'fixed', width: '100%' }}>
			<Title level={1} style={{ color: 'white' }}>
				{title}
			</Title>
		</Header>
	);
};

export default Titlebar;
