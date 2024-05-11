import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaType } from '../models/enums/media-type';
import { Media } from '../models/interfaces/media';
import { MediaListResponse } from '../models/interfaces/media-list-response';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDE5YWE4OWI2Mjc4YmY5ZjNhMjNhZGQ1NjVkN2JhYSIsInN1YiI6IjY2M2Q0MDRlOTFlYWQ0YmFlMzMwMDRjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HrMLO-GIIf8xMdxyTuTZVFGF0lERiVXfi_YqacSEeAg',
  });
  constructor(private http: HttpClient) {}

  public getTopRatedMediaList(
    mediaType: MediaType
  ): Observable<MediaListResponse> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/${mediaType}/top_rated`,
      {
        headers: this.headers,
      }
    );
  }

  public getMediaById(
    mediaType: MediaType,
    mediaId: number
  ): Observable<Media> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}`,
      {
        headers: this.headers,
      }
    );
  }
}
