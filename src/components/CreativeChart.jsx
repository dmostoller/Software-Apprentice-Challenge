import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const CreativeRadialChart = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4">
      <h2 className="text-xl font-bold mb-4">Creative Comparison</h2>
      {data.map((creativeData, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">{creativeData.creative}</h3>
          <RadialBarChart
            width={300}
            height={300}
            cx={150}
            cy={150}
            innerRadius={20}
            outerRadius={140}
            barSize={10}
            data={[
              { name: 'Spend', value: creativeData.spend },
              { name: 'Impressions', value: creativeData.impressions },
              { name: 'Clicks', value: creativeData.clicks },
              { name: 'Results', value: creativeData.results }
            ]}
          >
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="value" />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, top: 0 }} />
            <Tooltip />
          </RadialBarChart>
        </div>
      ))}
    </div>
  );
};

export default CreativeRadialChart;