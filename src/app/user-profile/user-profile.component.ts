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

  // Store old username separately to use for fetching and updating user info
  oldUsername: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token') || '';
    if (!token) {
      // Navigate to welcome page
      this.router.navigate(['/welcome']);
    }
    if (storedUser) {
      // Store old username
      this.oldUsername = storedUser.Username;
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
    this.fetchApiData.getUserData(this.oldUsername).subscribe(
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
      this.fetchApiData.updateUser(this.oldUsername, this.userData).subscribe(
        (response: any) => {
          // Exclude password from response before saving to local storage
          const { Password, ...updatedUserData } = response;

          // Save the updated user info to local storage
          localStorage.setItem('user', JSON.stringify(updatedUserData));

          // Update userData without Password field
          this.userData = { ...updatedUserData };

          // Update the stored oldUsername to reflect the updated username
          this.oldUsername = this.userData.Username;

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

  deleteUser(): void {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This cannot be undone.',
      )
    ) {
      this.fetchApiData.deleteUser(this.oldUsername).subscribe(
        (response: any) => {
          console.log(response);
          // Display alert for successful account deletion
          this.snackBar.open('Account Successfully Obliterated.', '💀', {
            duration: 4000,
          });
          // Delete user and token from local storage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // Navigate to welcome page
          this.router.navigate(['/welcome']);
        },
        (error: any) => {
          console.error('Error deleting user: ', error);
          // Display alert for failed update
          this.snackBar.open('Account Obliteration Failed!', '😅', {
            duration: 4000,
          });
        },
      );
    }
  }
}
