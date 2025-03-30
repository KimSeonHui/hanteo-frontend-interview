export type EventStatus = 'ongoing' | 'upcoming' | 'ended';

export type EventType = 'fan-club' | 'showcase' | 'vote' | 'fan-meeting';

export type Chart = {
  id: number;
  rank: number;
  title: string;
  artist: string;
  favorite: number;
  thumbnail: string;
};

export type Event = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: EventType;
  thumbnail: string;
  url: string;
  status: EventStatus;
};
