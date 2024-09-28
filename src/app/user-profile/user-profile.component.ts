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
    public snackBar: MatSnackBar,
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

  getUser(): void {
    this.fetchApiData.getUserData(this.userData.Username).subscribe(
      (response: any) => {
        // Destructure password from user object to exclude it from response
        const { Password, ...userData } = response;
        this.userData = userData;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      },
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
            // Exclude password from response before saving to local storage
            const { Password, ...updatedUserData } = response;

            // Save the updated user info to local storage
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            
            // Update userData without Password field
            this.userData = { ...updatedUserData };

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
          },
        );
    }
  }
}
