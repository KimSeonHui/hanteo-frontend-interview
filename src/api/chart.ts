import { Chart } from '@type';

export const getChart = async (page: number, pageSize: number) => {
  return new Promise<{ chart: Chart[] }>((resolve) => {
    setTimeout(async () => {
      const response = await fetch('/json/chart.json');
      const data = await response.json();

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const chart = data.chart.slice(startIndex, endIndex);

      resolve({ chart });
    }, 1000); // 테스트를 위한 딜레이 추가
  });
};
