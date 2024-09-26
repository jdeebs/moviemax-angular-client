import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '');
    if (storedUser) {
      this.userData = storedUser;
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
          password: '',
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
              password: '', // Clear password after update for security
            };
            localStorage.setItem('user', JSON.stringify(this.userData));

            // Fetch latest user info to reflect changes in the view
            this.getUser();
          },
          (error: any) => {
            console.error('Error updating user: ', error);
          }
        );
    }
  }
}
