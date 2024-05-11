import { Component } from '@angular/core';
import { Media } from '../../models/interfaces/media';
import { MediaService } from '../../services/media.service';
import { MediaType } from '../../models/enums/media-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css',
})
export class MediaListComponent {
  public mediaList: Media[];
  public mediaType: MediaType;

  public constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mediaList = [];
    this.mediaType = MediaType.TV;
  }

  public ngOnInit(): void {
    this.mediaType = this.route.snapshot.paramMap.get('mediaType') as MediaType;
    if (this.mediaType != null && this.paramsValid()) {
      this.mediaService
        .getTopRatedMediaList(this.mediaType as MediaType)
        .subscribe((data) => (this.mediaList = data.results));
    } else {
      this.router.navigateByUrl('page-not-found');
    }
  }

  private paramsValid = (): boolean =>
    Object.values(MediaType).includes(this.mediaType as MediaType);
}
