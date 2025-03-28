export type BannerStatus = 'ongoing' | 'upcoming' | 'ended';

export type BannerType = 'fan-signing' | 'fan-meeting' | 'showcase' | 'vote';

export type Banner = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  type: BannerType;
  thumbnail: string;
  url: string;
  status: BannerStatus;
};

export type Chart = {
  id: number;
  rank: number;
  title: string;
  artist: string;
  favorite: number;
  thumbnail: string;
};
