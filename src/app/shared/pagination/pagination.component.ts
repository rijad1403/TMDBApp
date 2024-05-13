import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input()
  public pageNumber: number = 0;
  @Input()
  public totalPages: number = 0;
  @Output()
  public pageNumberEvent: EventEmitter<number> = new EventEmitter<number>();

  public constructor() {}

  public emitPageNumber($event: KeyboardEvent, pageNumber: string): void {
    if ($event.keyCode == 13 && +pageNumber <= this.totalPages) {
      this.pageNumberEvent.emit(+pageNumber);
    }
  }

  public goToPage(pageNumber: number): void {
    this.pageNumberEvent.emit(+pageNumber);
  }
}
