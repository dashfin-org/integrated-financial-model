import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

// (Keep the calculateBollingerBands function as it was)
const calculateBollingerBands = (data, period = 20, stdDev = 2) => {
    const sma = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const std = (arr) => {
        const mean = sma(arr);
        return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / arr.length);
    };

    const bands = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= period - 1) {
            const slice = data.slice(i - period + 1, i + 1).map(d => d.close);
            const middle = sma(slice);
            const deviation = std(slice);
            bands.push({
                time: data[i].time,
                upper: middle + (deviation * stdDev),
                middle: middle,
                lower: middle - (deviation * stdDev),
            });
        } else {
            bands.push({ time: data[i].time });
        }
    }
    return bands;
};


export const ChartComponent = ({ data }) => {
	const chartContainerRef = useRef();
    const chartRef = useRef();
    const seriesRef = useRef({});
    const [showBBands, setShowBBands] = useState(true);

	useEffect(() => {
        // Create the chart only once
		chartRef.current = createChart(chartContainerRef.current, {
			layout: { background: { color: 'white' }, textColor: '#333' },
			width: chartContainerRef.current.clientWidth,
			height: 300,
            rightPriceScale: { scaleMargins: { top: 0.2, bottom: 0.2 } },
		});
		chartRef.current.timeScale().fitContent();

		seriesRef.current.candle = chartRef.current.addCandlestickSeries({
			upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
			wickUpColor: '#26a69a', wickDownColor: '#ef5350',
		});
		seriesRef.current.candle.setData(data);

        const handleResize = () => chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chartRef.current.remove();
		};
	}, []); // Empty dependency array ensures this runs only once

    // Effect to handle Bollinger Bands visibility
    useEffect(() => {
        if (showBBands) {
            const bbData = calculateBollingerBands(data);
            seriesRef.current.bbUpper = chartRef.current.addLineSeries({ color: '#2962FF', lineWidth: 1, lastValueVisible: false, priceLineVisible: false });
            seriesRef.current.bbMiddle = chartRef.current.addLineSeries({ color: 'rgba(41, 98, 255, 0.5)', lineWidth: 1, lastValueVisible: false, priceLineVisible: false });
            seriesRef.current.bbLower = chartRef.current.addLineSeries({ color: '#2962FF', lineWidth: 1, lastValueVisible: false, priceLineVisible: false });

            seriesRef.current.bbUpper.setData(bbData.map(d => ({ time: d.time, value: d.upper })));
            seriesRef.current.bbMiddle.setData(bbData.map(d => ({ time: d.time, value: d.middle })));
            seriesRef.current.bbLower.setData(bbData.map(d => ({ time: d.time, value: d.lower })));
        } else {
            // Remove the series if they exist
            if (seriesRef.current.bbUpper) chartRef.current.removeSeries(seriesRef.current.bbUpper);
            if (seriesRef.current.bbMiddle) chartRef.current.removeSeries(seriesRef.current.bbMiddle);
            if (seriesRef.current.bbLower) chartRef.current.removeSeries(seriesRef.current.bbLower);
        }
    }, [showBBands, data]);

	return (
        <div>
            <div ref={chartContainerRef} style={{ flex: 2, minWidth: '400px' }} />
            <div className="controls" style={{ paddingTop: '10px' }}>
                <button onClick={() => setShowBBands(!showBBands)} style={{ marginRight: '10px' }}>
                    {showBBands ? 'Hide' : 'Show'} Bollinger Bands
                </button>
            </div>
        </div>
    );
};