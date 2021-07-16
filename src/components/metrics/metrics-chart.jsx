import React from 'react';
import { Card, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';
import { DateTime } from 'luxon';

const { Text } = Typography;

const Chart = props => {
	const { metric, tsData } = props;

	const rows = tsData?.rows;
	return (
		<Card
			title={metric._source.measure}
			style={{ borderRadius: '8px', margin: '16px 0px' }}
			bodyStyle={{ padding: '0px' }}
			actions={metric._source.dimensions.map(dimension => (
				<Text strong>
					{dimension.name} - {dimension.value ?? 'all'}
				</Text>
			))}
		>
			<ReactECharts
				style={{
					height: '250px',
				}}
				option={{
					xAxis: {
						type: 'time',
						axisPointer: {
							lineStyle: {
								type: 'solid',
							},
							label: {
								formatter(params) {
									const date = DateTime.fromMillis(params.value);
									return date.toLocaleString(DateTime.DATE_MED);
								},
							},
						},
						// Issue with labels overlapping is because of echarts
						axisLabel: {
							formatter: '{MMM} {d}, {yyyy}',
						},
						axisLine: {
							show: false,
						},
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: false,
						},
						axisTick: {
							show: true,
						},
						axisPointer: {
							label: {
								precision: 1,
							},
						},
					},
					grid: {
						bottom: '32px',
						top: '32px',
						right: '5%',
					},
					tooltip: {
						trigger: 'axis',
						show: true,
						confine: true,
						axisPointer: {
							type: 'cross',
						},
						formatter(params) {
							const date = DateTime.fromISO(params[0].value[0]);
							const originalValue = rows[params[0].dataIndex].original_value;
							const predictedValue = rows[params[0].dataIndex].predicted_value;
							const anomalyScore = rows[params[0].dataIndex].anomaly_score;
							const forecastedValue = rows[params[0].dataIndex].forecasted_value;
							const hr = '<hr />';
							const br = '<br />';
							return (
								date.toLocaleString(DateTime.DATETIME_MED) +
								hr +
								(originalValue ? `Value: ${originalValue.toFixed(2)}${br}` : '') +
								(predictedValue
									? `Predicted Value: ${predictedValue.toFixed(2)}${br}`
									: '') +
								(anomalyScore
									? `Anomaly Score: ${anomalyScore.toFixed(2)}${br}`
									: '') +
								(forecastedValue && !originalValue
									? `Forecasted Value: ${forecastedValue.toFixed(2)}${br}`
									: '')
							);
						},
					},
					useUTC: true,
					series: [
						{
							name: 'Value',
							type: 'line',
							data: rows?.map(row => [
								row.timestamp,
								row.original_value && row.line_status !== 2
									? row.original_value
									: '-',
							]),
							showSymbol: false,
						},
						{
							name: 'Forecast',
							type: 'line',
							data: rows?.map(row => [
								row.timestamp,
								row.forecasted_value
									? row.original_value ?? row.forecasted_value
									: '-',
							]),
							lineStyle: {
								type: 'dashed',
								color: '#5470c6',
							},
							itemStyle: {
								color: '#5470c6',
							},
							showSymbol: false,
						},
						{
							name: 'Anomaly',
							type: 'line',
							data: rows?.map(row => [
								row.timestamp,
								row.original_value &&
								(row.line_status === 1 ||
									row.line_status === 2 ||
									row.line_status === 3)
									? row.original_value
									: '-',
							]),
							lineStyle: {
								color: '#ee6666',
							},
							itemStyle: {
								color: '#ee6666',
							},
							showSymbol: false,
						},
						{
							name: 'Lower Bound',
							type: 'line',
							data: rows?.map(row => [
								row.timestamp,
								row.min_band ?? row.forecasted_min_band,
							]),
							lineStyle: {
								opacity: 0,
							},
							stack: 'prediction-band',
							symbol: 'none',
						},
						{
							name: 'Upper Bound',
							type: 'line',
							data: rows?.map(row => [
								row.timestamp,
								(row.max_band ?? row.forecasted_max_band) -
									(row.min_band ?? row.forecasted_min_band),
							]),
							lineStyle: {
								opacity: 0,
							},
							areaStyle: {
								color: '#ccc',
							},
							stack: 'prediction-band',
							symbol: 'none',
						},
					],
				}}
			/>
		</Card>
	);
};

export default Chart;
