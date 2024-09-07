import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import SummaryBarChart from './SummaryBarChart';

const Dashboard = () => {
  const [ads, setAds] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [sortOrder, setSortOrder] = useState(null);

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
                ad.results = result.results;
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

  const handleSort = useCallback((order) => {
    setSortOrder(order);
    const sortedAds = [...ads].sort((a, b) => {
      return order === 'asc' ? a.spend - b.spend : b.spend - a.spend;
    });
    setAds(sortedAds);
  }, [ads, setSortOrder]);

  const filteredAds = ads.filter(ad => 
    ad.campaign.toLowerCase().includes(searchVal.toLowerCase())
  );

  const maxImpressions = Math.max(...ads.map(ad => ad.impressions));
  const maxClicks = Math.max(...ads.map(ad => ad.clicks));
  const maxResults = Math.max(...ads.map(ad => ad.results));

  const summaryData = [
    { name: 'Spend', value: ads.reduce((acc, ad) => acc + ad.spend, 0) },
    { name: 'Impressions', value: ads.reduce((acc, ad) => acc + ad.impressions, 0) },
    { name: 'Clicks', value: ads.reduce((acc, ad) => acc + ad.clicks, 0) },
    { name: 'Results', value: ads.reduce((acc, ad) => acc + ad.results, 0) }
  ];


  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <input 
            type="text" 
            placeholder="Search by campaign name" 
            value={searchVal} 
            onChange={handleSearch} 
            className="border p-2 rounded mb-4 w-full bg-gray-800 border-gray-700 text-gray-100"
          />
          <div className="flex space-x-2 mb-4">
            <button 
              onClick={() => handleSort('asc')} 
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sort by Spend Ascending
            </button>
            <button 
              onClick={() => handleSort('desc')} 
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sort by Spend Descending
            </button>
            <button 
              onClick={() => setSortOrder(null)} 
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear Sort
            </button>
          </div>
        </div>
        <SummaryBarChart data={summaryData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAds.map((ad, index) => (
          <Card key={index} ad={ad} maxImpressions={maxImpressions} maxClicks={maxClicks} maxResults={maxResults} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;