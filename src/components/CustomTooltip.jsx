import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-600">
            <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;