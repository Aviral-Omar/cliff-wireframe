import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Input, Collapse, Checkbox, Typography, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Sider } = Layout;
const { Panel } = Collapse;
const { Search } = Input;
const { Title } = Typography;

const StyledCheckboxGroup = styled(Checkbox.Group)`
	.ant-checkbox-wrapper {
		display: block;
		margin: 8px;
	}
	.ant-checkbox-inner {
		display: inline-block;
	}
`;

const arrayToString = arr => {
	let str = '';
	arr.forEach((el, index) => {
		str += index !== 0 ? ' OR' : '';
		str += ` ${el}`;
	});
	return str;
};

const Explorer = props => {
	const [explorerCollapsed, setCollapsed] = useState(window.innerWidth >= 1200);
	const [recommendations, setRecommendations] = useState({});

	const signOut = () => props.removeToken();

	const { stream, filters, setFilters, selectedFilters, setSelected } = props;

	return (
		<Sider
			reverseArrow
			width="40%"
			collapsed={explorerCollapsed}
			collapsible
			collapsedWidth={0}
			breakpoint="xl"
			theme="dark"
			// trigger={null}
			onCollapse={() => setCollapsed(!explorerCollapsed)}
			style={{
				marginTop: '64px',
			}}
		>
			<Title level={2} style={{ color: 'white', margin: '16px 24px' }}>
				Applied Filters
			</Title>
			{Object.entries(filters).flatMap(entry =>
				entry[1].length !== 0
					? [
							<Title
								level={5}
								style={{ color: 'white', margin: '8px 24px' }}
								key={arrayToString(entry[1])}
							>{`${entry[0]} =${arrayToString(entry[1])}`}</Title>,
					  ]
					: [],
			)}
			<Title level={2} style={{ color: 'white', margin: '16px 24px' }}>
				Selected Filters
			</Title>
			{Object.entries(selectedFilters).flatMap(entry =>
				entry[1].length !== 0
					? [
							<Title
								level={5}
								style={{ color: 'white', margin: '8px 24px' }}
								key={arrayToString(entry[1])}
							>{`${entry[0]} =${arrayToString(entry[1])}`}</Title>,
					  ]
					: [],
			)}

			<Collapse
				accordion
				expandIconPosition="right"
				bordered={false}
				style={{
					margin: '16px 24px 8px 24px',
					backgroundColor: '#001529',
					borderRadius: '8px',
				}}
			>
				{stream.meta?.dimensions.map(dimension => {
					const autoComplete = async el => {
						try {
							const response = await axios.post(
								'http://localhost:8080/autocomplete',
								{
									name: dimension,
									text: el?.target.value ?? '',
									limit: 5,
									id: stream.source._id,
								},
								{
									headers: {
										Authorization: props.authToken,
									},
								},
							);
							setRecommendations({
								...recommendations,
								[dimension]: response.data,
							});
						} catch (e) {
							if (e.response.status === 401) {
								signOut();
								console.log('Unauthenticated');
							} else {
								console.log('Bad Gateway');
							}
						}
					};

					return (
						<Panel
							header={dimension}
							key={dimension}
							style={{
								borderRadius: '8px',
								overflow: 'hidden',
								backgroundColor: 'white',
								marginBottom: '8px',
							}}
						>
							<Search allowClear onChange={autoComplete} onFocus={autoComplete} />
							<StyledCheckboxGroup
								options={recommendations[dimension]}
								onChange={checkedValues => {
									const newFilterValues = [
										...new Set(
											selectedFilters[dimension]
												.concat(checkedValues)
												.filter(val => {
													if (
														!checkedValues.includes(val) &&
														recommendations[dimension].includes(val)
													) {
														return false;
													}
													return true;
												}),
										),
									];
									setSelected({
										...selectedFilters,
										[dimension]: newFilterValues,
									});
								}}
								style={{ display: 'block' }}
							/>
						</Panel>
					);
				})}
			</Collapse>
			<Button
				type="primary"
				icon={<FilterOutlined />}
				style={{ margin: '8px 24px', backgroundColor: '#001529', borderRadius: '8px' }}
				onClick={() => setFilters(selectedFilters)}
			>
				Filter
			</Button>
		</Sider>
	);
};

export default Explorer;
