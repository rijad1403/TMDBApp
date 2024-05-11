import { Component, Input } from '@angular/core';
import { Media } from '../../models/interfaces/media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
})
export class MediaComponent {
  @Input()
  public media: Media;
  public constructor() {
    this.media = {} as Media;
  }
}
