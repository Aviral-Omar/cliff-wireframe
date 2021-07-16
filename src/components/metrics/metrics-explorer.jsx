import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Input, Collapse, Checkbox, Typography } from 'antd';
import styled from 'styled-components';

const { Sider } = Layout;
const { Panel } = Collapse;
const { Search } = Input;
const { Title, Text } = Typography;

const StyledCheckboxGroup = styled(Checkbox.Group)`
	.ant-checkbox-wrapper {
		display: block;
		margin: 8px;
	}
	.ant-checkbox-inner {
		display: inline-block;
	}
`;

const Explorer = props => {
	const [explorerCollapsed, setCollapsed] = useState(window.innerWidth >= 1200);
	const [stream, setStream] = useState({});
	const [filter, setFilter] = useState({});
	const [recommendations, setRecommendations] = useState({});

	const signOut = () => props.removeToken();

	const { streamId } = props;

	useEffect(() => {
		if (Object.keys(stream).length !== 0) {
			const f = {};
			stream.meta.dimensions.forEach(dimension => {
				f[dimension] = [];
			});
			setFilter(f);
		}
	}, [stream]);

	useEffect(() => {
		const getStream = async () => {
			if (streamId) {
				try {
					const response = await axios.post(
						'http://localhost:8080/streams',
						{ id: streamId },
						{
							headers: {
								Authorization: props.authToken,
							},
						},
					);
					if (response.status === 200) {
						setStream(response.data);
					} else if (response.status === 401) {
						signOut();
					} else if (response.status === 502) {
						throw Error('Bad Gateway');
					}
				} catch (e) {
					console.log(e);
				}
			}
		};
		getStream();
	}, [streamId]);

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
			<Title level={3} style={{ color: 'white', margin: '16px 24px' }}>
				Applied Filters
			</Title>
			<Title level={3} style={{ color: 'white', margin: '16px 24px' }}>
				Selected Filters
			</Title>
			<Text style={{ color: 'white', margin: '16px 24px' }}>
				{Object.entries(filter).map(entry => `${entry[0]} = ${entry[1]}\n`)}
			</Text>
			<Collapse
				accordion
				expandIconPosition="right"
				bordered={false}
				style={{ margin: '16px 24px', backgroundColor: '#001529', borderRadius: '8px' }}
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
									id: streamId,
								},
								{
									headers: {
										Authorization: props.authToken,
									},
								},
							);
							if (response.status === 200) {
								setRecommendations({
									...recommendations,
									[dimension]: response.data,
								});
							}
							if (response.status === 401) {
								signOut();
							} else if (response.status === 502) {
								throw Error('Bad Gateway');
							}
						} catch (e) {
							console.log(e);
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
								marginBottom: '16px',
							}}
						>
							<Search allowClear onChange={autoComplete} onFocus={autoComplete} />
							<StyledCheckboxGroup
								options={recommendations[dimension]}
								onChange={checkedValues => {
									const newFilterValues = [
										...new Set(
											filter[dimension].concat(checkedValues).filter(val => {
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
									setFilter({ ...filter, [dimension]: newFilterValues });
									console.log(filter);
								}}
								style={{ display: 'block' }}
							/>
						</Panel>
					);
				})}
			</Collapse>
		</Sider>
	);
};

export default Explorer;
