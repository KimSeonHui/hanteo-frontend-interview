export const getChart = async () => {
  const response = await fetch('/json/chart.json');
  const data = await response.json();
  return data;
};
