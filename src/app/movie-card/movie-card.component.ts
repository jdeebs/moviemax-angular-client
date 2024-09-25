import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieInfoDialogComponent } from '../movie-info-dialog/movie-info-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Store returned movie data
  movies: any[] = [];
  // Public keyword makes fetchApiData accessible from outside of the class
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  // Lifecycle hook called when component is initialized
  // Call getMovies() when component initializes
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    // Fetch movies from API service function
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenre(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: String(movie.Genre.Name).toUpperCase(),
        content: movie.Genre.Description
      },
      width: "500px"
    })
  }

  showDirector(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: movie.Director.Name,
        content: `Born ${movie.Director.Birth}, ${movie.Director.Bio}`
      },
      width: "500px"
    })
  }

  showSynopsis(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: "500px"
    })
  }
}
