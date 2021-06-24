import React from 'react';
import { Typography, Space, Input, Row, Col, Checkbox, Button, Form } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Password } = Input;

const SignInForm = props => {
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
			const response = await fetch('http://localhost:8080/sign-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			if (response.status === 200) {
				const token = await response.text();
				props.setToken(token);
			} else if (response.status >= 400) {
				throw Error(response.statusText);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Row style={{ minHeight: '100vh' }} justify="space-around" align="middle">
			<Col {...span}>
				<Space direction="vertical" size="large" style={{ width: '100%' }}>
					<header>
						<Title level={1} style={{ marginBottom: '8px' }}>
							Sign In!
						</Title>
						<Title level={4} style={{ marginTop: '8px' }}>
							Please enter your credentials below
						</Title>
					</header>
					<Form {...layout} name="signup-form" labelAlign="left" onFinish={submitForm}>
						<Form.Item name="email" label="Email">
							<Input />
						</Form.Item>
						<Form.Item name="password" label="Password">
							<Password />
						</Form.Item>
						<Form.Item name="remember" valuePropName="checked">
							<Checkbox>Remember Me</Checkbox>
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button type="primary" size="large" htmlType="submit" block>
								Sign In
							</Button>
						</Form.Item>
					</Form>
					<Link to="/sign-up">New User? Sign up here!</Link>
				</Space>
			</Col>
		</Row>
	);
};

export default SignInForm;
