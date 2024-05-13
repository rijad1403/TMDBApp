import { Component } from '@angular/core';
import { NavLink } from '../../models/interfaces/nav-link';
import { MediaType } from '../../models/enums/media-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public navLinks: NavLink[];

  public constructor() {
    this.navLinks = [
      {
        title: 'Movies',
        link: `media/${MediaType.MOVIE}`,
      },
      {
        title: 'TV shows',
        link: `media/${MediaType.TV}`,
      },
    ];
  }
}
