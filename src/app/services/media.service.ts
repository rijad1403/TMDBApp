import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaType } from '../models/enums/media-type';
import { Media } from '../models/interfaces/media';
import { MediaListResult } from '../models/interfaces/media-list-result';
import { environment } from '../../../environment';
import { MediaVideosResult } from '../models/interfaces/media-videos-result';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders(environment.headers);
  private constructor(private http: HttpClient) { }

  public getTopRatedMediaList(mediaType: MediaType): Observable<MediaListResult> {
    return this.http.get<MediaListResult>(`${this.apiUrl}/${mediaType}/top_rated`,
      {
        headers: this.headers,
      }
    );
  }

  public getMediaById(mediaType: MediaType, mediaId: number): Observable<Media> {
    return this.http.get<Media>(`${this.apiUrl}/${mediaType}/${mediaId}`,
      {
        headers: this.headers,
      }
    );
  }

  public getMediaListBySearchText(mediaType: MediaType, searchText: string, pageNumber: number = 1): Observable<MediaListResult> {
    return this.http.get<MediaListResult>(`${this.apiUrl}/search/${mediaType}?query=${searchText}&page=${pageNumber}`,
      {
        headers: this.headers,
      }
    );
  }

  public getVideosByMediaId(mediaType: MediaType, mediaId: number): Observable<MediaVideosResult> {
    return this.http.get<MediaVideosResult>(`${this.apiUrl}/${mediaType}/${mediaId}/videos`,
      {
        headers: this.headers,
      }
    );
  }
}
