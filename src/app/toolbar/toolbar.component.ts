import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    if (window.confirm("Are you sure you want to logout?")) {
      this.router.navigate(['welcome']);
      localStorage.removeItem('user');
    }
  }

  openProfile(): void {
    this.router.navigate(['profile'])
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

  // Ensure home button is not rendered when on the home screen (movies)
  showHome(): boolean {
    return this.router.url !== '/movies';
  }
}
