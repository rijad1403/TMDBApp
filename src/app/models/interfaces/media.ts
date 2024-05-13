export interface Media {
  id: number;
  original_name: string | null;
  original_title: string | null;
  overview: string | null;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: { name: string }[];
}
