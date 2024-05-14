import { Component, OnDestroy, OnInit } from '@angular/core';
import { Media } from '../../models/interfaces/media';
import { MediaService } from '../../services/media.service';
import { MediaType } from '../../models/enums/media-type';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css',
})
export class MediaListComponent implements OnDestroy {
  public mediaList: Media[] = [];
  public mediaType: MediaType = MediaType.TV;
  public dataLoading: boolean = true;
  public mediaHeader: string = '';
  public infoText: string = '';
  public searchPlaceholder: string = '';
  public searchText: string = '';
  public pageNumber: number = 1;
  public totalPages: number = 0;
  public totalResults: number = 0;
  public showTopRatedMedia: boolean = true;

  private routeSubscription: Subscription;
  private typingTimer = setTimeout(() => { });

  public constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.mediaType = params['mediaType'] as MediaType;
      this.checkQueryParams();
      if (this.paramsValid()) {
        this.setHeaderAndPlaceholderValues();
        this.getMediaList();
      } else {
        this.router.navigateByUrl('page-not-found');
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private paramsValid(): boolean {
    return Object.values(MediaType).includes(this.mediaType);
  }

  public onSearchChange(): void {
    clearTimeout(this.typingTimer);
    if (this.searchText.length > 2) {
      this.typingTimer = setTimeout(() => {
        this.dataLoading = true;
        this.pageNumber = 1;
        this.getMediaListBySearchText();
      }, 1000);
    } else {
      this.dataLoading = true;
      this.getTopRatedMediaList();
    }
  }

  public onPageNumberEmitted($event: number): void {
    this.pageNumber = $event;
    this.router.navigateByUrl(
      `/media/${this.mediaType}?search=${this.searchText}&pageNumber=${this.pageNumber}`
    );
    this.dataLoading = true;
    this.getMediaListBySearchText();
  }

  private setHeaderAndPlaceholderValues(): void {
    this.mediaHeader =
      this.mediaType === MediaType.MOVIE ? 'Movies' : 'TV shows';
    this.searchPlaceholder = `Enter 3 or more characters to start searching for ${this.mediaHeader.toLowerCase()}...`;
  }

  private setInfoText(): void {
    this.infoText = this.showTopRatedMedia
      ? `Showing top 10 ${this.mediaHeader.toLowerCase()}.`
      : `There are ${this.totalResults} results for search term "${this.searchText}".`;
    if (!this.showTopRatedMedia && this.totalResults > 0) {
      this.infoText = this.infoText.concat(
        ` Showing page ${this.pageNumber} of ${this.totalPages}.`
      );
    }
  }

  private getMediaList(): void {
    this.dataLoading = true;
    this.searchText.length > 2
      ? this.getMediaListBySearchText()
      : this.getTopRatedMediaList();
  }

  private getTopRatedMediaList(): void {
    this.mediaService
      .getTopRatedMediaList(this.mediaType as MediaType)
      .subscribe(
        (mediaListResult) => {
          this.mediaList = mediaListResult.results.slice(0, 10);
          this.showTopRatedMedia = true;
          this.setInfoText();
          this.dataLoading = false;
        },
        () => this.router.navigateByUrl('/page-not-found')
      );
  }

  private getMediaListBySearchText(): void {
    this.mediaService
      .getMediaListBySearchText(this.mediaType as MediaType, this.searchText, this.pageNumber)
      .subscribe(
        (mediaListResult) => {
          this.mediaList = mediaListResult.results;
          this.pageNumber = mediaListResult.page;
          this.totalPages = mediaListResult.total_pages;
          this.totalResults = mediaListResult.total_results;
          this.showTopRatedMedia = false;
          this.setInfoText();
          this.dataLoading = false;
        },
        () => this.router.navigateByUrl('/page-not-found')
      );
  }

  private checkQueryParams(): void {
    const searchText = this.route.snapshot.queryParams['search'];
    const pageNumber = this.route.snapshot.queryParams['pageNumber'];
    this.searchText = searchText ?? this.searchText;
    this.pageNumber = pageNumber ?? 1;
  }
}
