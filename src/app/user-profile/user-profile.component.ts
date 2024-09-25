import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};

  constructor(public fetchApiData: FetchApiDataService, public router: Router) {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
  }

  ngOnInit(): void {
    this.getUser();
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

  getUser(): void {
    this.fetchApiData
      .getUserData(this.userData.Username)
      .subscribe((response: any) => {
        this.userData = {
          ...response.user,
          id: response.user._id,
          password: this.userData.Password,
          token: response.token,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('token', response.token);
      });
  }
}
