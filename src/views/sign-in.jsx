import React from 'react';
import { Typography, Space, Input, Row, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Password } = Input;

const SignIn = () => (
	<Row style={{ minHeight: '100vh' }} justify="center" align="middle">
		<Space direction="vertical" size="large">
			<header>
				<Title level={1} style={{ marginBottom: '8px' }}>
					Sign In!
				</Title>
				<Title level={4} style={{ marginTop: '8px' }}>
					Please enter your credentials below
				</Title>
			</header>
			<Input addonBefore="Email" />
			<Password addonBefore="Password" />
			<Checkbox>Remember Me</Checkbox>
			<Button type="primary" size="large" block>
				Sign In
			</Button>
			<Link to="/sign-up">New User? Sign up here!</Link>
		</Space>
	</Row>
);

export default SignIn;
