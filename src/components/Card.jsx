import React from 'react';
import { FaFacebook, FaSnapchatGhost, FaTwitter, FaEye, FaMousePointer, FaChartLine } from 'react-icons/fa';

const Card = ({ ad, maxImpressions, maxClicks, maxResults }) => {
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

  const getProgressPercentage = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="bg-white text-black p-4 rounded shadow-lg relative border border-gray-300">
      <div className="absolute top-2 right-2 text-4xl">
        {getPlatformIcon(ad.platform)}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{ad.campaign}</h2>
      <div className="space-y-2">
        <p className="text-gray-700"><span className="font-semibold">Adset:</span> {ad.adset}</p>
        <p className="text-gray-700"><span className="font-semibold">Creative:</span> {ad.creative}</p>
        <p className="text-gray-700 text-xl font-bold"><span className="font-semibold">Spend:</span> ${ad.spend}</p>
        <div className="flex items-center space-x-2">
          <FaEye className="text-gray-700" />
          <p className="text-gray-700"><span className="font-semibold">Impressions:</span> {ad.impressions}</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${getProgressPercentage(ad.impressions, maxImpressions)}%` }}></div>
        </div>
        <div className="flex items-center space-x-2">
          <FaMousePointer className="text-gray-700" />
          <p className="text-gray-700"><span className="font-semibold">Clicks:</span> {ad.clicks}</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${getProgressPercentage(ad.clicks, maxClicks)}%` }}></div>
        </div>
        <div className="flex items-center space-x-2">
          <FaChartLine className="text-gray-700" />
          <p className="text-gray-700"><span className="font-semibold">Results:</span> {ad.results}</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${getProgressPercentage(ad.results, maxResults)}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Card;