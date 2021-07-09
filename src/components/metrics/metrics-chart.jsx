import React from 'react';
import { Card, Typography } from 'antd';
import ReactEChartsCore from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

const { Text } = Typography;

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const Chart = props => {
	const { metric, tsData } = props;

	const formattedData = tsData?.rows.map(row => [new Date(row.timestamp), row.original_value]);
	return (
		<Card
			title={metric._source.measure}
			style={{ borderRadius: '8px', margin: '8px 0px' }}
			actions={metric._source.dimensions.map(dimension => (
				<Text strong>
					{dimension.name} - {dimension.value ?? 'all'}
				</Text>
			))}
		>
			<ReactEChartsCore
				option={{
					toottip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'time',
						data: formattedData.map(dataPoint => dataPoint[0])
					},
					yAxis: {
						type: 'value',
					},
					series: [{
						type: 'line',
						data: formattedData.map(dataPoint => dataPoint[1])
					}]
				}}
			/>
		</Card>
	);
};

export default Chart;
