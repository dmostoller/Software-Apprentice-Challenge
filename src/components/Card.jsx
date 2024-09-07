import React from 'react';
import Chart from './Chart';
import RadialChart from './RadialChart';
import { FaFacebook, FaSnapchatGhost, FaTwitter } from 'react-icons/fa';

const Card = ({ ad, maxImpressions, maxClicks, maxResults  }) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Facebook':
        return <FaFacebook className="text-blue-600" />;
      case 'Twitter':
        return <FaTwitter className="text-blue-400" />;
      case 'Snapchat':
        return <FaSnapchatGhost className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-xl p-6 m-4 relative transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="absolute top-2 right-2 text-4xl">
        {getPlatformIcon(ad.platform)}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-100">{ad.campaign}</h2>
      <div className="space-y-2">
        <p className="text-gray-400"><span className="font-semibold">Adset:</span> {ad.adset}</p>
        <p className="text-gray-400"><span className="font-semibold">Creative:</span> {ad.creative}</p>
        <p className="text-gray-400"><span className="font-semibold">Spend:</span> ${ad.spend}</p>
        <p className="text-gray-400"><span className="font-semibold">Impressions:</span> {ad.impressions}</p>
        <p className="text-gray-400"><span className="font-semibold">Clicks:</span> {ad.clicks}</p>
        <p className="text-gray-400"><span className="font-semibold">Results:</span> {ad.results}</p>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <RadialChart name="Impressions" value={ad.impressions} maxValue={maxImpressions} />
        <RadialChart name="Clicks" value={ad.clicks} maxValue={maxClicks} />
        <RadialChart name="Results" value={ad.results} maxValue={maxResults} />
      </div>
    </div>
  );
};

export default Card;