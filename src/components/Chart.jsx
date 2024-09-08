import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const Chart = ({ data }) => {
    return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 5, left: 5, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="campaign" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="spend" barSize={20} fill="#8884d8" />
        <Line type="monotone" dataKey="impressions" stroke="#ff7300" />
        <Line type="monotone" dataKey="clicks" stroke="#387908" />
        <Line type="monotone" dataKey="results" stroke="#ff0000" />
      </ComposedChart>
    </ResponsiveContainer>
    );
  };
  
export default Chart;

