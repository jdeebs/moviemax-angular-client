// Angular Core & Material Design Imports
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Component Imports
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviemax-angular-client';

  constructor(public dialog: MatDialog) {}
  // Open the dialog when signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Dialog width
      width: '280px',
    });
  }
  // Open the dialog when login button is clicked
  openLoginUserDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Dialog width
      width: '280px',
    });
  }
  // Open the dialog when movie card is clicked
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
