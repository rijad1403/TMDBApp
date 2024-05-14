import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Media } from '../../models/interfaces/media';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
})
export class MediaComponent implements OnChanges {
  @Input()
  public media: Media = {} as Media;
  @Input()
  public onDetailsPage: boolean = false;
  @Input()
  public mediaTrailerYTKey: string | undefined;
  public safeYTVideoUrl: SafeResourceUrl = '';
  public imageUrl: string = environment.imageUrl;
  public ytLinkPart: string = environment.ytLinkPart;
  public ytLinkQueryParams: string = environment.ytLinkQueryParams;
  public noPosterFoundPath: string = '../../../assets/no-poster-found.jpg';
  public noBackdropFoundPath: string = '../../../assets/no-backdrop-found.jpg';

  public constructor(private sanitizer: DomSanitizer) {
  }

  public ngOnChanges(): void {
    if (this.onDetailsPage && this.mediaTrailerYTKey) {
      this.safeYTVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.ytLinkPart}/${this.mediaTrailerYTKey}?${this.ytLinkQueryParams}`);
    }
  }

}
