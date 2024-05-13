import { Media } from './media';

export interface MediaListResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Media[];
}
