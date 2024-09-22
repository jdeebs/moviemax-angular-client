import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
}
