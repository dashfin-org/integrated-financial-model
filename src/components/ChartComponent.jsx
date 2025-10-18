import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = ({ data }) => {
	const chartContainerRef = useRef();

	useEffect(() => {
		const handleResize = () => {
			chart.applyOptions({ width: chartContainerRef.current.clientWidth });
		};

		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: { color: 'white' },
				textColor: '#333',
			},
			width: chartContainerRef.current.clientWidth,
			height: 300,
		});
		chart.timeScale().fitContent();

		const newSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});
		newSeries.setData(data);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
		};
	}, [data]);

	return <div ref={chartContainerRef} style={{ flex: 2, minWidth: '400px' }} />;
};