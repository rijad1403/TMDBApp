import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MediaService } from './media.service';
import { MediaType } from '../models/enums/media-type';
import { MediaListResult } from '../models/interfaces/media-list-result';
import { Media } from '../models/interfaces/media';
import { MediaVideosResult } from '../models/interfaces/media-videos-result';
import { environment } from '../../../environment';

describe('MediaService', () => {
  let service: MediaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediaService]
    });
    service = TestBed.inject(MediaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get top rated media list', () => {
    const mediaType = MediaType.MOVIE;
    const mockMediaListResult: MediaListResult = { results: [], page: 1, total_pages: 1, total_results: 0 };

    service.getTopRatedMediaList(mediaType).subscribe((result) => {
      expect(result).toEqual(mockMediaListResult);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${mediaType}/top_rated`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMediaListResult);
  });

  it('should get media by mediaId', () => {
    const mediaType = MediaType.MOVIE;
    const mediaId = 1;
    const mockMedia: Media = { id: 1, original_name: 'Test Movie' } as Media;

    service.getMediaById(mediaType, mediaId).subscribe((result) => {
      expect(result).toEqual(mockMedia);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${mediaType}/${mediaId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockMedia);
  });

  it('should get media list by search text', () => {
    const mediaType = MediaType.MOVIE;
    const searchText = 'test';
    const pageNumber = 1;
    const mockMediaListResult: MediaListResult = { results: [], page: 1, total_pages: 1, total_results: 0 };

    service.getMediaListBySearchText(mediaType, searchText, pageNumber).subscribe((result) => {
      expect(result).toEqual(mockMediaListResult);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/search/${mediaType}?query=${searchText}&page=${pageNumber}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMediaListResult);
  });

  it('should get videos by media id', () => {
    const mediaType = MediaType.MOVIE;
    const mediaId = 1;
    const mockVideosResult: MediaVideosResult = { mediaId: 1, results: [] };

    service.getVideosByMediaId(mediaType, mediaId).subscribe((result) => {
      expect(result).toEqual(mockVideosResult);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${mediaType}/${mediaId}/videos`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockVideosResult);
  });
});
