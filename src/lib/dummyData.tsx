export const dummyDashboardData = {
    dashboardData: {
      charts: {
        salesOverTime: {
          labels: ['2023-01-01', '2023-02-01', '2023-03-01'],
          data: [100000, 150000, 200000],
        },
        userEngagement: [
          { engagement: 5000, week: 'Week 1' },
          { engagement: 7000, week: 'Week 2' },
        ],
      },
      tables: {
        topProducts: [
          { name: 'Product A', sales: 12000 },
          { name: 'Product B', sales: 11000 },
        ],
      },
      map: {
        locations: [
          { label: 'New Delhi', activity: 1200 },
          { label: 'Mumbai', activity: 1500 },
        ],
      },
    },
  };
  