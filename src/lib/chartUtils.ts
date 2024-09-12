import { ChartData, Location, Product } from '@/customTypes/dashboard-data'

export function getHighestSalesDay(data: ChartData) {
  if (!data || !data.data || !data.labels) return { day: '', amount: 0 };
  const maxSales = Math.max(...data.data)
  const maxSalesIndex = data.data.indexOf(maxSales)
  return { day: data.labels[maxSalesIndex], amount: data.data[maxSalesIndex] }
}

export function getHighestEngagement(data: ChartData) {
  if (!data || !data.data || !data.labels) return { week: '', engagement: 0 };
  
  const maxEngagement = Math.max(...data.data);
  const maxEngagementIndex = data.data.indexOf(maxEngagement);
  
  return { week: data.labels[maxEngagementIndex], engagement: data.data[maxEngagementIndex] };
}

export function getTotalRevenue(data: ChartData) {
  if (!data || !data.data || !data.labels) return { amount: 0, years: [] };

  let amount = 0;
  const years: string[] = [];

  data.labels.forEach((date, index) => {
    amount += data.data[index];
    const year = date.split('-')[0];
    if (!years.includes(year)) years.push(year);
  });

  return { amount, years };
}

export function getTopProduct(data: Product[]) {
  if (!data || !data.length) return { name: '', sales: 0 };

  const topProduct = data.reduce((acc, curr) => acc.sales > curr.sales ? acc : curr);
  return topProduct;
}

export function getHighestActivityLocation(locations: Location[]) {
  if (!locations || !locations.length) return { label: '', activity: 0 };

  const highestActivityLocation = locations.reduce((acc, curr) => acc.activity > curr.activity ? acc : curr);
  return highestActivityLocation;
}
