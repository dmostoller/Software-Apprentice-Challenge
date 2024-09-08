import React from 'react';

const SummaryCard = ({ data }) => {

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 m-4">
    <h2 className="text-xl font-bold mb-4">Summary of Metrics</h2>
    <div className="grid grid-cols-2 gap-4">
      {data.map((metric, index) => (
        <div key={index} className="bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">{metric.name}</h3>
          <p className="text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  </div>
  );
  
};



export default SummaryCard;