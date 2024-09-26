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
          ...response,
          id: response._id,
          password: '',
        };
        console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
      });
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData.Username, this.userData).subscribe(
      (response: any) => {
        this.userData = {
          ...response,
          id: response._id,
          password: this.userData.Password,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log("Update successful");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
