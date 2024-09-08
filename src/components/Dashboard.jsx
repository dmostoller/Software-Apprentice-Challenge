import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import SummaryCard from './SummaryBarChart';
import Chart from './Chart';

const Dashboard = () => {
  const [ads, setAds] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [sortedAds, setSortedAds] = useState([...ads]);
  const [selectedCreative, setSelectedCreative] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://localhost:3000/fakeDataSet');
        const data = await response.json();
        const standardizedAds = [];

        if (data.facebook_ads) {
          data.facebook_ads.forEach(ad => {
            standardizedAds.push({
              campaign: ad.campaign_name,
              adset: ad.media_buy_name,
              creative: ad.ad_name,
              spend: ad.spend,
              impressions: ad.impressions,
              clicks: ad.clicks,
              platform: 'Facebook',
              results: 0, 
              utm_campaign: ad.campaign_name,
              utm_medium: ad.media_buy_name,
              utm_content: ad.ad_name
            });
          });
        }

        if (data.twitter_ads) {
          data.twitter_ads.forEach(ad => {
            standardizedAds.push({
              campaign: ad.campaign,
              adset: ad.ad_group,
              creative: ad.image_name,
              spend: ad.spend,
              impressions: ad.impressions,
              clicks: ad.post_clicks,
              platform: 'Twitter',
              results: 0,
              utm_campaign: ad.campaign,
              utm_medium: ad.ad_group,
              utm_content: ad.image_name
            });
          });
        }

        if (data.snapchat_ads) {
          data.snapchat_ads.forEach(ad => {
            standardizedAds.push({
              campaign: ad.campaign_name,
              adset: ad.ad_squad_name,
              creative: ad.creative_name,
              spend: ad.cost,
              impressions: ad.impressions,
              clicks: ad.post_clicks,
              platform: 'Snapchat',
              results: 0,
              utm_campaign: ad.campaign_name,
              utm_medium: ad.ad_squad_name,
              utm_content: ad.creative_name
            });
          });
        }

        if (data.google_analytics) {
          data.google_analytics.forEach(result => {
            standardizedAds.forEach(ad => {
              if (
                ad.utm_campaign === result.utm_campaign &&
                ad.utm_medium === result.utm_medium &&
                ad.utm_content === result.utm_content
              ) {
                ad.results = ad.results += result.results;
              }
            });
          });
        }

        setAds(standardizedAds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAds();
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchVal(e.target.value);
  }, []);

  const handleSort = (order) => {
    setSortOrder(() => order);
  };

  const handleClearSort = () => {
    setSortedAds(([]) => [...ads]);
    setSortOrder(() => null);
  };

  useEffect(() => {
    if (sortOrder === null) {
      setSortedAds([...ads]);
    } else {
      const sortedAds = [...ads].sort((a, b) => {
        return sortOrder === 'asc' ? a.spend - b.spend : b.spend - a.spend;
      });
      setSortedAds(sortedAds);
    }
  }, [ads, sortOrder]);


  const handleCreativeChange = (e) => {
    setSelectedCreative(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const filteredAds = sortedAds.filter(ad => 
    ad.campaign.toLowerCase().includes(searchVal.toLowerCase()) &&
    (selectedCreative === '' || ad.creative === selectedCreative) &&
    (selectedPlatform === '' || ad.platform === selectedPlatform)
  );

  const maxImpressions = Math.max(...ads.map(ad => ad.impressions));
  const maxClicks = Math.max(...ads.map(ad => ad.clicks));
  const maxResults = Math.max(...ads.map(ad => ad.results));

  const summaryData = [
    { name: 'Spend', value: filteredAds.reduce((acc, ad) => acc + ad.spend, 0) },
    { name: 'Impressions', value: filteredAds.reduce((acc, ad) => acc + ad.impressions, 0) },
    { name: 'Clicks', value: filteredAds.reduce((acc, ad) => acc + ad.clicks, 0) },
    { name: 'Results', value: filteredAds.reduce((acc, ad) => acc + ad.results, 0) }
  ];

  const uniqueCreatives = [...new Set(ads.map(ad => ad.creative))];
  const uniquePlatforms = [...new Set(ads.map(ad => ad.platform))];

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <input 
            type="text" 
            placeholder="Search by campaign name" 
            value={searchVal} 
            onChange={handleSearch} 
            className="border p-2 rounded mb-4 w-full bg-gray-100 border-gray-300 text-black"
          />
          <div className="flex space-x-2 mb-4">
            <button 
              onClick={() => handleSort('asc')} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sort by Spend Ascending
            </button>
            <button 
              onClick={() => handleSort('desc')} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sort by Spend Descending
            </button>
            <button 
              onClick={handleClearSort} 
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Clear Sort
            </button>
          </div>
          <div className="flex space-x-2 mb-4">
            <select 
              value={selectedCreative} 
              onChange={handleCreativeChange} 
              className="border p-2 rounded bg-gray-100 border-gray-300 text-black"
            >
              <option value="">All Creatives</option>
              {uniqueCreatives.map((creative, index) => (
                <option key={index} value={creative}>{creative}</option>
              ))}
            </select>
            <select 
              value={selectedPlatform} 
              onChange={handlePlatformChange} 
              className="border p-2 rounded bg-gray-100 border-gray-300 text-black"
            >
              <option value="">All Platforms</option>
              {uniquePlatforms.map((platform, index) => (
                <option key={index} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>
        <SummaryCard data={summaryData} />
      </div>
      <Chart data={filteredAds} />
      {filteredAds.length === 0 ? (
      <div className="text-center text-red-500 text-4xl font-bold p-4 border-2 border-red-500 rounded-lg">
        No results
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAds.map((ad, index) => (
            <Card key={index} ad={ad} maxImpressions={maxImpressions} maxClicks={maxClicks} maxResults={maxResults} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;