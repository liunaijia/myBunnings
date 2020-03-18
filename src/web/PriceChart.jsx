import React from 'react';
import {
  string, arrayOf, shape, number,
} from 'prop-types';
import { Line } from 'react-chartjs-2';

function PriceChart({ className, priceHistory, price }) {
  const data = priceHistory.concat([{ date: new Date(), price }])
    .map(item => ({ x: item.date, y: item.price }));
  return (
    <Line
      className={className}
      data={{
        datasets: [{
          data,
          steppedLine: true,
          backgroundColor: 'transparent',
          borderColor: '#2e67fb',
          pointBackgroundColor: '#2e67fb',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }],
      }}
      options={{
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month',
            },
          }],
        },
      }}
    />
  );
}

PriceChart.propTypes = {
  className: string,
  priceHistory: arrayOf(shape(
    {
      data: string,
      price: number,
    },
  )),
  price: number,
};

PriceChart.defaultProps = {
  className: undefined,
  priceHistory: [],
  price: undefined,
};

export default PriceChart;
