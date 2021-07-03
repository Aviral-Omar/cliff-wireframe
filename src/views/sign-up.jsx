import React, { useState } from 'react';
import { Typography, Space, Input, Row, Col, Checkbox, Button, Form } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { Password } = Input;

const SignUpForm = () => {
	const [redirect, setRedirect] = useState(null);

	const span = {
		xl: 8,
		lg: 10,
		md: 12,
		sm: 18,
		xs: 20,
	};
	const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
	const tailLayout = { wrapperCol: { span: 24 } };

	const submitForm = async values => {
		try {
			const response = await axios.post('http://localhost:8080/sign-up', values);
			if (response.status === 201) {
				setRedirect('/sign-in');
			} else if (response.status >= 400) {
				throw Error(response.statusText);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return redirect ? (
		<Redirect to={redirect} />
	) : (
		<Row style={{ minHeight: '100vh' }} justify="space-around" align="middle">
			<Col {...span}>
				<Space direction="vertical" size="large" style={{ width: '100%' }}>
					<header>
						<Title level={1} style={{ marginBottom: '8px' }}>
							Sign Up!
						</Title>
						<Title level={4} style={{ marginTop: '8px' }}>
							Please fill out the information below to sign up
						</Title>
					</header>
					<Form {...layout} name="signup-form" labelAlign="left" onFinish={submitForm}>
						<Form.Item name="name" label="Name">
							<Input />
						</Form.Item>
						<Form.Item name="email" label="Email">
							<Input />
						</Form.Item>
						<Form.Item name="password" label="Password">
							<Password />
						</Form.Item>
						<Form.Item name="tandc" valuePropName="checked">
							<Checkbox>I agree to the Terms & Conditions.</Checkbox>
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button type="primary" size="large" htmlType="submit" block>
								Sign Up
							</Button>
						</Form.Item>
					</Form>
					<Link to="/sign-in">Already a User? Sign in here!</Link>
				</Space>
			</Col>
		</Row>
	);
};

export default SignUpForm;
