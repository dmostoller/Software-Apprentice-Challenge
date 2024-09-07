import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const Chart = ({ data }) => {

  const maxValue = Math.max(data.impressions, data.clicks, data.results);

  
  const chartData = [
    { name: 'Impressions', value: data.impressions },
    { name: 'Clicks', value: data.clicks },
    { name: 'Results', value: data.results }
  ];

  return (
    <BarChart
      width={300}
      height={200}
      data={chartData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip content={<CustomTooltip />} />
      {/* <Legend /> */}
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;