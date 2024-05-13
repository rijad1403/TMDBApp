import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { MediaComponent } from './media/media.component';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MediaComponent,
    NavbarComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule],
  exports: [
    LoaderComponent,
    CommonModule,
    MediaComponent,
    NavbarComponent,
    AppRoutingModule,
    FormsModule,
    PaginationComponent,
  ],
})
export class SharedModule {}
