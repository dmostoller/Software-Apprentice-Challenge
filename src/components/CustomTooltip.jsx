import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { campaign, adset, creative, spend, impressions, clicks, results } = payload[0].payload;
    return (
      <div className="bg-white text-black p-4 rounded shadow-lg border border-gray-300">
        <p className="font-bold">{label}</p>
        <p><span className="font-semibold">Campaign:</span> {campaign}</p>
        <p><span className="font-semibold">Adset:</span> {adset}</p>
        <p><span className="font-semibold">Creative:</span> {creative}</p>
        <p><span className="font-semibold">Spend:</span> ${spend}</p>
        <p><span className="font-semibold">Impressions:</span> {impressions}</p>
        <p><span className="font-semibold">Clicks:</span> {clicks}</p>
        <p><span className="font-semibold">Results:</span> {results}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;