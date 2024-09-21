import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Base URL of the MovieMax API
const apiUrl = 'https://movie-max-f53b34b56a95.herokuapp.com/';

@Injectable({
  // This service is provided at the root level, making it available across the app
  providedIn: 'root',
})

export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        .pipe(catchError(this.handleError))
    );
  }

  // User login
  public userLogin(userDetails: any) {
    return (
      this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError))
    )
  }

  // Get all movies
  public getAllMovies() {
    return (
      this.http
      .get(apiUrl + 'movies')
      .pipe(catchError(this.handleError))
    )
  }

  // Get a single movie
  public getSingleMovie(title: string) {
    return (
      this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(this.handleError))
    )
  }

  // Get director
  public getDirector(directorName: string) {
    return (
      this.http
      .get(apiUrl + 'movies/director/' + directorName)
      .pipe(catchError(this.handleError))
    )
  }

  // Get genre
  public getGenre(genreName: string) {
    return (
      this.http
      .get(apiUrl + 'movies/genre/' + genreName)
      .pipe(catchError(this.handleError))
    )
  }

  // Get user data
  // Includes id, username, pass, email, birthday, fav movies
  public getUserData(username: string) {
    return (
      this.http
      .get(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError))
    )
  }

  // Add movie to favorites
  public addFavoriteMovie(username: string, movieId: string) {
    return (
      this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movieId, {}) // Empty object as body since we don't need to send any data
      .pipe(catchError(this.handleError))
    )
  }

  // Update user info
  public updateUser(username: string, userDetails: any) {
    return (
      this.http
      .put(apiUrl + 'users/' + username, userDetails)
      .pipe(catchError(this.handleError))
    )
  }

  // Delete user
  public deleteUser(username: string) {
    return (
      this.http
      .delete(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError))
    )
  }

  // Delete movie from favorites
  public deleteFavoriteMovie(username: string, movieId: string) {
    return (
      this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId)
      .pipe(catchError(this.handleError))
    )
  }

  // Handles client-side and server-side errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error (e.g., network issue, browser-related error)
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error (e.g., API returned a failure response)
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return an observable that emits an error message
    // throwError expects a function to return the error
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
