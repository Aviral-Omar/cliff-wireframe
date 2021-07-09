import React from 'react';
import { Card, Typography } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

const { Text } = Typography;

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

const Chart = props => {
	const { metric, tsData } = props;

	const formattedData = tsData?.rows.map(row => [row.timestamp, row.original_value]);
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
				echarts={echarts}
				option={{
					toottip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'time',
					},
					yAxis: {
						type: 'value',
					},
					source: {
						data: formattedData,
						type: 'line',
					},
				}}
				notMerge
				lazyUpdate
			/>
		</Card>
	);
};

export default Chart;
