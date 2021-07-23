import React, { useState } from 'react';
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

	const { streams, filters, setFilters, selectedFilters, setSelected } = props;

	const dimensions = [];
	streams?.forEach(stream => {
		stream.meta.dimensions.forEach(dimension => {
			dimensions.push({
				id: stream._id,
				stream: stream.name,
				name: dimension,
			});
		});
	});

	const selected = [];
	const applied = [];

	Object.entries(selectedFilters).forEach(entry => {
		Object.entries(entry[1]).forEach(dim => {
			if (dim[1].length !== 0) {
				selected.push(
					<Title
						level={5}
						style={{ color: 'white', margin: '8px 24px' }}
						key={arrayToString(dim[1])}
					>{`${dim[0]} - ${entry[0]} =${arrayToString(dim[1])}`}</Title>,
				);
			}
		});
	});
	Object.entries(filters).forEach(entry => {
		Object.entries(entry[1]).forEach(dim => {
			if (dim[1].length !== 0) {
				applied.push(
					<Title
						level={5}
						style={{ color: 'white', margin: '8px 24px' }}
						key={arrayToString(dim[1])}
					>{`${dim[0]} =${arrayToString(dim[1])}`}</Title>,
				);
			}
		});
	});

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
			{applied}
			<Title level={2} style={{ color: 'white', margin: '16px 24px' }}>
				Selected Filters
			</Title>
			{selected}

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
				{dimensions.map(dimension => {
					const autoComplete = async el => {
						try {
							const response = await axios.post(
								'http://localhost:8080/autocomplete',
								{
									name: dimension.name,
									text: el?.target.value ?? '',
									limit: 5,
									id: dimension.id,
								},
								{
									headers: {
										Authorization: props.authToken,
									},
								},
							);
							setRecommendations({
								...recommendations,
								[dimension.id]: {
									...recommendations[dimension.id],
									[dimension.name]: response.data,
								},
							});
						} catch (e) {
							if (e.response?.status === 401) {
								signOut();
								console.log('Unauthenticated');
							} else {
								console.log('Bad Gateway');
							}
						}
					};

					return (
						<Panel
							header={`${dimension.name} - ${dimension.stream}`}
							key={`${dimension.name}_${dimension.id}`}
							style={{
								borderRadius: '8px',
								overflow: 'hidden',
								backgroundColor: 'white',
								marginBottom: '8px',
							}}
						>
							<Search allowClear onChange={autoComplete} onFocus={autoComplete} />
							<StyledCheckboxGroup
								options={recommendations[dimension.id]?.[dimension.name]}
								onChange={checkedValues => {
									const newFilterValues = [
										...new Set(
											selectedFilters[dimension.stream]?.[dimension.name]
												.concat(checkedValues)
												.filter(val => {
													if (
														!checkedValues.includes(val) &&
														recommendations[dimension.id]?.[
															dimension.name
														].includes(val)
													) {
														return false;
													}
													return true;
												}),
										),
									];
									setSelected({
										...selectedFilters,
										[dimension.stream]: {
											...selectedFilters[dimension.stream],
											[dimension.name]: newFilterValues,
										},
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
