export const dummyDashboardData = {
  dashboardData: {
    charts: {
      salesOverTime: {
        labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01'],
        data: [500, 1200, 900, 1400, 2000]
      },
      userEngagement: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [6000, 8000, 7500, 9000]
      }
    },
    tables: {
      recentTransactions: [
        { id: 1, user: 'John Doe', amount: '$150.00', date: '2023-07-01' },
        { id: 2, user: 'Jane Smith', amount: '$250.00', date: '2023-07-02' },
        { id: 3, user: 'Bob Brown', amount: '$300.00', date: '2023-07-03' }
      ],
      topProducts: [
        { id: 'p1', name: 'Product A', sales: 12000 },
        { id: 'p2', name: 'Product B', sales: 11000 },
        { id: 'p3', name: 'Product C', sales: 10000 }
      ]
    },
    map: {
      locations: [
        { latitude: 28.6139, longitude: 77.209, label: 'New Delhi', activity: 1200 },
        { latitude: 19.076, longitude: 72.8777, label: 'Mumbai', activity: 1500 },
        { latitude: 12.9716, longitude: 77.5946, label: 'Bangalore', activity: 1350 }
      ]
    }
  }
};
