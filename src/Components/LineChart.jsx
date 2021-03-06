import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice = [];
    const coinTimeStamp = [];
    for (let i = 0; i < coinHistory?.history?.length; i++) {
        coinPrice.push(coinHistory?.history[i]?.price);
        coinTimeStamp.push(new Date(coinHistory?.history[i]?.timestamp).toLocaleDateString());
    }
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scale: {
            yAxes: [
                {
                    tick: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Row className='chart-header'>
                <Typography.Title level={2} className='chart-title'>{coinName} Price Chart</Typography.Title>
                <Col className='price-container'>
                    <Typography.Title level={5} className='price-change'>{coinHistory?.change}%</Typography.Title>
                    <Typography.Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart;