import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData: {
    Username: string;
    Password: string;
    Email: string;
    Birthday: string;
  } = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '');
    if (storedUser) {
      this.userData = {
        Username: storedUser.Username,
        Password: '', // Clear password field
        Email: storedUser.Email,
        Birthday: storedUser.Birthday,
      };
      // Fetch latest data from API
      this.getUser();
    }
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

  getUser(): void {
    this.fetchApiData.getUserData(this.userData.Username).subscribe(
      (response: any) => {
        this.userData = {
          ...response,
          id: response._id,
          Password: '', // Clear password for security
        };
        console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateUser(): void {
    if (
      window.confirm('Are you sure you want to update? This cannot be undone.')
    ) {
      this.fetchApiData
        .updateUser(this.userData.Username, this.userData)
        .subscribe(
          (response: any) => {
            // Save the updated user info to local storage
            this.userData = {
              ...response,
              id: response._id,
              Password: '', // Clear password after update for security
            };
            localStorage.setItem('user', JSON.stringify(this.userData));

            // Display alert for successful update
            this.snackBar.open('Update successful!', 'OK', {
              duration: 4000,
            });
            // Fetch latest user info to reflect changes in the view
            this.getUser();
          },
          (error: any) => {
            console.error('Error updating user: ', error);
            // Display alert for failed update
            this.snackBar.open('Update Failed!', 'OK', {
              duration: 4000,
            });
          }
        );
    }
  }
}
