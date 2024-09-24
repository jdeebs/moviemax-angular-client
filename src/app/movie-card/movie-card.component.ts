import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Store returned movie data
  movies: any[] = [];
  // Public keyword makes fetchApiData accessible from outside of the class
  constructor(public fetchApiData: FetchApiDataService) {}

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
}
