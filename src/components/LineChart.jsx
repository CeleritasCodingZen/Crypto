import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const chartRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      // Destroy the existing chart instance
      chartInstance.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const coinTimestamp = coinHistory?.data?.history.map(entry => entry.timestamp);
      const coinPrice = coinHistory?.data?.history.map(entry => entry.price);

      Chart.register(...registerables); // Register necessary plugins
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: coinTimestamp,
          datasets: [
            {
              label: 'Price In USD',
              data: coinPrice,
              fill: false,
              backgroundColor: '#0071bd',
              borderColor: '#0071bd',
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time', // Use 'time' scale for x-axis
              time: {
                unit: 'day', // You can adjust the time unit as needed
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [coinHistory]);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default LineChart;
