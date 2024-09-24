/**
 * This service handles all HTTP requests to the MovieMax API, such as user registration, login, fetching movie data, updating user information, and managing favorite movies.
 *
 * It includes methods for making GET, POST, PUT, and DELETE requests to various API endpoints.
 * Each API call includes the necessary bearer token for authentication in the request headers.
 */

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
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

  // Helper methods

  // Get token from local storage
  private getToken(): string {
    const userToken = localStorage.getItem('token');
    return userToken ? userToken : '';
  }

  // Set header to include bearer token for API access
  private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return headers;
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
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  // API request methods

  // User registration
  public userRegistration(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get a single movie
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get director
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Get genre
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get user data
  // Includes id, username, pass, email, birthday, fav movies
  public getUserData(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Add movie to favorites
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        { headers: this.setHeaders() }
      ) // Empty object as body since we don't need to send any data
      .pipe(catchError(this.handleError));
  }

  // Delete movie from favorites
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Update user info
  public updateUser(username: string, userData: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }
}
