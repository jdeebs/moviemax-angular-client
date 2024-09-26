import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieInfoDialogComponent } from '../movie-info-dialog/movie-info-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Store movie data returned from API
  movies: any[] = [];
  // Inject services and make them available in the component
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // Lifecycle hook called when component is initialized
  // Call getMovies() when component initializes
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    // Fetch movies from API service function
    this.fetchApiData.getAllMovies().subscribe(
      (response: any) => {
        // Assign returned movie data to movies array, no need for a return statement
        this.movies = response;

        // Get user from local storage
        let user = JSON.parse(localStorage.getItem('user') || '');
        // Loop through each movie, check if it's in the users favorite list
        this.movies.forEach((movie: any) => {
          // Add 'isFavorite' property to each movie to manage UI state of favorite icon
          movie.isFavorite = user.FavoriteMovies.includes(movie._id);
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  showGenre(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: String(movie.Genre.Name).toUpperCase(),
        content: movie.Genre.Description,
      },
      width: '500px',
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: movie.Director.Name,
        content: `Born ${movie.Director.Birth}, ${movie.Director.Bio}`,
      },
      width: '500px',
    });
  }

  showSynopsis(movie: any): void {
    this.dialog.open(MovieInfoDialogComponent, {
      data: {
        title: movie.Title,
        content: movie.Description,
      },
      width: '500px',
    });
  }

  // Method to add or remove movie from users favorites
  modifyFavoriteMovies(movie: any): void {
    // Get current user data
    let user = JSON.parse(localStorage.getItem('user') || '');
    // Get specific favorite icon element based on its ID, using interpolation in template
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    // If movie is already in favorites, remove it
    if (user.FavoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movie._id).subscribe(
        (response: any) => {
          // Change favorite icon to hollow
          icon?.setAttribute('fontIcon', 'favorite_border');

          // Display alert confirming removal
          this.snackBar.open('Removed movie from favorites.', 'OK', {
            duration: 4000,
          });

          // Update user with new favorite list
          user.FavoriteMovies = response.FavoriteMovies;
          // Save updated user to localStorage
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      // If movie is not in favorites, add it
      this.fetchApiData.addFavoriteMovie(user.Username, movie._id).subscribe(
        (response: any ) => {
          // Change favorite icon to filled
          icon?.setAttribute('fontIcon', 'favorite');

          // Display alert confirming add
          this.snackBar.open('Added movie to favorites.', 'OK', {
            duration: 4000,
          });

          // Update user with new favorite list
          user.FavoriteMovies = response.FavoriteMovies;
          // Save updated user to localStorage
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
