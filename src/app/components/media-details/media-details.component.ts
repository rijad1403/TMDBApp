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
  public media: Media;

  public constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.media = {} as Media;
  }

  public ngOnInit(): void {
    const mediaType = this.route.snapshot.paramMap.get('mediaType');
    const mediaId = this.route.snapshot.paramMap.get('mediaId');
    if (
      mediaType !== null &&
      mediaId !== null &&
      this.paramsValid(mediaType, mediaId)
    ) {
      this.mediaService
        .getMediaById(mediaType as MediaType, +mediaId)
        .subscribe((data) => (this.media = data));
    } else {
      this.router.navigateByUrl('page-not-found');
    }
  }

  private paramsValid = (mediaType: string, mediaId: string): boolean =>
    Object.values(MediaType).includes(mediaType as MediaType) &&
    !Number.isNaN(+mediaId);
}
