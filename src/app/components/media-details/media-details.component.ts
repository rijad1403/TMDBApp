import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../models/interfaces/media';
import { MediaService } from '../../services/media.service';
import { MediaType } from '../../models/enums/media-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.css',
})
export class MediaDetailsComponent implements OnInit {
  @Input()
  public media: Media = {} as Media;
  public dataLoading: boolean = true;
  public mediaType: MediaType = MediaType.MOVIE;
  public searchText: string = '';
  public pageNumber: number = 0;
  public mediaTrailerYTKey: string | undefined;

  public constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.mediaType = this.route.snapshot.params['mediaType'];
    const mediaId = +this.route.snapshot.params['mediaId'];
    this.searchText = this.route.snapshot.queryParams['search'];
    this.pageNumber = +this.route.snapshot.queryParams['pageNumber'];

    if (
      this.mediaType !== null &&
      mediaId !== null &&
      this.paramsValid(this.mediaType, mediaId)
    ) {
      this.getMediaById(this.mediaType as MediaType, mediaId);
    } else {
      this.router.navigateByUrl('page-not-found');
    }
  }

  private paramsValid(mediaType: string, mediaId: number): boolean {
    return (
      Object.values(MediaType).includes(mediaType as MediaType) &&
      !Number.isNaN(mediaId)
    );
  }

  private getMediaById(mediaType: MediaType, mediaId: number): void {
    this.dataLoading = true;
    this.mediaService
      .getMediaById(mediaType as MediaType, mediaId)
      .subscribe(
        media => {
          this.media = media;
          this.mediaService.getVideosByMediaId(mediaType as MediaType, mediaId)
            .subscribe(mediaVideosResult => {
              const mediaVideos = mediaVideosResult.results;
              this.mediaTrailerYTKey = mediaVideos.find(mediaVideo =>
                mediaVideo.site.toLowerCase() == 'youtube' &&
                mediaVideo.type.toLowerCase() == 'trailer')?.key;
              this.dataLoading = false;
            });
        }, () => this.router.navigateByUrl('/page-not-found'));
  }

}
