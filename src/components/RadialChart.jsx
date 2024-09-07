import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const RadialChart = ({ name, value, maxValue }) => {
  const data = [{ name, value: value, fill: '#8884d8' }];

  return (
    <RadialBarChart
      width={150}
      height={150}
      cx={75}
      cy={75}
      innerRadius={20}
      outerRadius={70}
      barSize={10}
      data={data}
      className="bg-gray-800"
    >
      <RadialBar
        minAngle={15}
        background
        clockWise
        dataKey="value"
      />
      <Tooltip />
      <Legend />
    </RadialBarChart>
  );
};

export default RadialChart;