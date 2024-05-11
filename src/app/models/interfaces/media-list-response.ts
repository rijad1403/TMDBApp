import { Media } from './media';

export interface MediaListResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Media[];
}
