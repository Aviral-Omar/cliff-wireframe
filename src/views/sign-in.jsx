import React from 'react';
import { Typography, Space, Input, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Password } = Input;

const SignIn = () => (
	<Row style={{ minHeight: '100vh' }} justify="center" align="middle">
		<Space direction="vertical" size="large">
			<Space direction="vertical" size={0}>
				<Title level={1}>Sign In!</Title>
				<Title level={4}>Please enter your credentials below</Title>
			</Space>
			<Input addonBefore="Email" />
			<Password addonBefore="Password" />
			<Button type="primary" size="large" block>
				Sign In
			</Button>
			<Link to="/sign-up">New User? Sign up here!</Link>
		</Space>
	</Row>
);

export default SignIn;
