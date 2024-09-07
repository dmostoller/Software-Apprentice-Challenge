import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const SummaryBarChart = ({ data }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 m-4">
      <h2 className="text-xl font-bold mb-4">Summary of Metrics</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SummaryBarChart;