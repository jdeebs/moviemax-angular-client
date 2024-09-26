// Core Angular Modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Angular Material Modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Access API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    // Access API methods
    public fetchApiData: FetchApiDataService,
    // Control the dialog(modal) that opens the form
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    // Show feedback notifications to user
    public snackBar: MatSnackBar,
    // Define router to allow navigation back to welcome page
    public router: Router
  ) {}

  // Lifecycle method called when component is initialized. Empty since login logic is handled in loginUser()
  ngOnInit(): void {}

  // Send the form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response: any) => {
        this.dialogRef.close(); // Close dialog on success
        console.log(response);
        this.snackBar.open('Login successful!', 'OK', {
          duration: 4000,
        });
        // Save user and token in local storage
        let user = {
          ...response.user,
          id: response.user._id,
          password: this.userData.Password,
          token: response.token
        }
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('token', response.token);
        // Navigate to movie route after login
        this.router.navigate(['movies']);
      },
      (response: any) => {
        // Unsuccessful login
        console.log(response);
        this.snackBar.open('Login failed!', 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
