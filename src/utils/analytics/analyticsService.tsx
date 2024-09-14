type AnalyticsData = {
    pageViews: number;
    visits: number;
  };
  
  const analytics: Record<string, AnalyticsData> = {};
  
  export function incrementPageView(pageId: string) {
    if (!analytics[pageId]) {
      analytics[pageId] = { pageViews: 0, visits: 0 };
    }
    analytics[pageId].pageViews += 1;
  }
  
  export function incrementVisit(pageId: string) {
    if (!analytics[pageId]) {
      analytics[pageId] = { pageViews: 0, visits: 0 };
    }
    analytics[pageId].visits += 1;
  }
  
  export function getAnalytics(pageId: string): AnalyticsData {
    return analytics[pageId] || { pageViews: 0, visits: 0 };
  }