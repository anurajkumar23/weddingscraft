// Takes date as 2023-09-28 and returns Sep 28
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options); // Change to Indian locale
}

// Takes date as 2023-09-28 and returns 2023
export function getYear(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}

// Formats number with commas according to the Indian numbering system
export function formatNumberWithCommas(number: number): string {
  return number.toLocaleString('en-IN'); // Change to Indian locale
}
