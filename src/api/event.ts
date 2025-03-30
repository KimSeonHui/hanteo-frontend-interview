import type { Event } from '@type';

export const getEvents = async (page: number, pageSize: number) => {
  return new Promise<{ events: Event[] }>((resolve) => {
    setTimeout(async () => {
      const response = await fetch('/json/event.json');
      const data = await response.json();

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const events = data.events.slice(startIndex, endIndex);

      resolve({ events });
    }, 1000); // 테스트를 위한 딜레이 추가
  });
};
