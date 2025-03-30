import { Chart } from '@type';

export const getChart = async () => {
  return new Promise<{ chart: Chart[] }>((resolve) => {
    setTimeout(async () => {
      const response = await fetch('/json/chart.json');
      const data = await response.json();
      resolve(data);
    }, 3000);
  });
};
