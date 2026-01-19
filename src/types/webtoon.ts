export interface Webtoon {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  genre: string;
  tags: string[];
  description: string;
  updateDay: string;
  likeCount: number;
  isNew: boolean;
  viewCount: number;
}

export interface Episode {
  id: number;
  episodeNumber: number;
  title: string;
  thumbnail: string;
  uploadDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFree: boolean;
}

export interface WebtoonDetail extends Webtoon {
  authorComment: string;
  bannerImage: string;
  longDescription: string;
  subscriberCount: number;
  rating: number;
  ratingCount: number;
  totalEpisodes: number;
  isCompleted: boolean;
  firstEpisodeDate: string;
  latestEpisodeDate: string;
  episodes: Episode[];
}
