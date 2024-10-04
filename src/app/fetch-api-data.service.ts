/**
 * This service handles all HTTP requests to the MovieMax API, such as user registration, login, fetching movie data, updating user information, and managing favorite movies.
 *
 * It includes methods for making GET, POST, PUT, and DELETE requests to various API endpoints.
 * Each API call includes the necessary bearer token for authentication in the request headers.
 *
 * @service
 */

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
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

  /**
   * Retrieves the stored token from local storage.
   *
   * @name getToken
   * @returns {string} The token or an empty string if not found.
   */
  private getToken(): string {
    const userToken = localStorage.getItem('token');
    return userToken ? userToken : '';
  }

  /**
   * Sets the HTTP headers for API requests, including the bearer token.
   *
   * @name setHeaders
   * @returns {HttpHeaders} Headers object with the Authorization token.
   */
  private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return headers;
  }

  /**
   * Handles HTTP errors for client and server responses.
   *
   * @name handleError
   * @param {HttpErrorResponse} error - The error response from the HTTP request.
   * @returns {Observable<never>} Observable that throws a user-friendly error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code: ${error.status}, body was: ${JSON.stringify(error.error)}`,
      );
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.'),
    );
  }

  // API request methods

  /**
   * Registers a new user.
   *
   * @name userRegistration
   * @param {object} userData - The data of the user to be registered (username, password, email).
   * @returns {Observable<any>} An observable with the API response.
   */
  public userRegistration(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in an existing user.
   *
   * @name userLogin
   * @param {object} userData - The login credentials (username, password).
   * @returns {Observable<any>} An observable with the API response containing user data and a token.
   */
  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches all movies.
   *
   * @name getAllMovies
   * @returns {Observable<any>} An observable with the list of movies.
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches a single movie by its title.
   *
   * @name getSingleMovie
   * @param {string} title - The title of the movie to fetch.
   * @returns {Observable<any>} An observable with the movie details.
   */
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details about a director by name.
   *
   * @name getDirector
   * @param {string} directorName - The name of the director to fetch.
   * @returns {Observable<any>} An observable with the director's details.
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches details about a genre by name.
   *
   * @name getGenre
   * @param {string} genreName - The name of the genre to fetch.
   * @returns {Observable<any>} An observable with the genre details.
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches user data, including username, email, and favorite movies.
   *
   * @name getUserData
   * @param {string} username - The username of the user to fetch data for.
   * @returns {Observable<any>} An observable with the user data.
   */
  public getUserData(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.setHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorites.
   *
   * @name addFavoriteMovie
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add.
   * @returns {Observable<any>} An observable with the API response.
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        { headers: this.setHeaders() },
      ) // Empty object as body since we don't need to send any data
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's favorites.
   *
   * @name deleteFavoriteMovie
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to remove.
   * @returns {Observable<any>} An observable with the API response.
   */
  public deleteFavoriteMovie(
    username: string,
    movieId: string,
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates the user's information (username, password, email, birthday).
   *
   * @name updateUser
   * @param {string} username - The username of the user to update.
   * @param {object} userData - The new user data to update.
   * @returns {Observable<any>} An observable with the API response.
   */
  public updateUser(username: string, userData: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user account.
   *
   * @name deleteUser
   * @param {string} username - The username of the user to delete.
   * @returns {Observable<HttpResponse<any>>} An observable with the deletion status.
   */
  public deleteUser(username: string) {
    return this.http
      .delete<HttpResponse<any>>(`${apiUrl}users/${username}`, {
        headers: this.setHeaders(),
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }
}
