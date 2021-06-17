import React from 'react';
import { Typography, Space, Input, Row, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Password } = Input;

const SignUp = () => (
	<Row style={{ minHeight: '100vh' }} justify="center" align="middle">
		<Space direction="vertical" size="large">
			<Space direction="vertical" size={0}>
				<Title level={1}>Sign Up!</Title>
				<Title level={4}>Please fill out the information below to sign up</Title>
			</Space>
			<Input addonBefore="Name" />
			<Input addonBefore="Email" />
			<Password addonBefore="Password" />
			<Checkbox>I agree to the Terms & Conditions.</Checkbox>
			<Button type="primary" size="large" block>
				Sign Up
			</Button>
			<Link to="/sign-in">Already a User? Sign in here!</Link>
		</Space>
	</Row>
);

export default SignUp;
