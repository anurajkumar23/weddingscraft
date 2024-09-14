'use client'

import React, { useState, useEffect } from 'react';

interface AnalyticsProps {
  pageId: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ pageId }) => {
  const [analytics, setAnalytics] = useState({ pageViews: 0, visits: 0 });

  const fetchAnalytics = async () => {
    const response = await fetch(`http://localhost:3000/api/analytics?pageId=${pageId}`,
        { cache: 'no-store' }
    );
    const data = await response.json();
    setAnalytics(data);
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [pageId]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Analytics</h2>
      <p>Page Views: {analytics.pageViews}</p>
      <p>Visits: {analytics.visits}</p>
    </div>
  );
};

export default Analytics;