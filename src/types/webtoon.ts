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
