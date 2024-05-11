import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { MediaListComponent } from './components/media-list/media-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/media',
    pathMatch: 'full',
  },
  {
    path: 'media',
    children: [
      {
        path: '',
        redirectTo: '/media/tv',
        pathMatch: 'full',
      },
      {
        path: ':mediaType',
        component: MediaListComponent,
      },
      {
        path: ':mediaType/:mediaId',
        component: MediaDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
