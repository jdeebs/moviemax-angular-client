// Core Angular Modules
import { Component, OnInit, Input } from '@angular/core';

// Angular Material Modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Access API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Define component decorator with key value pair metadata
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})

// Define class to handle user registration
export class UserRegistrationFormComponent implements OnInit {
  // Data Binding, takes userData info from parent component
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    // Access API methods
    public fetchApiData: FetchApiDataService,
    // Control the dialog(modal) that opens the form
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    // Show feedback notifications to user
    public snackBar: MatSnackBar
  ) {}

  // Lifecycle method called when component is initialized. Empty since registration logic is handled in registerUser()
  ngOnInit(): void {}

  // Send the form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response: any) => {
        // Successful registration
        this.dialogRef.close(); // Close dialog on success
        console.log(response);
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      (response: any) => {
        // Unsuccessful registration
        console.log(response);
        this.snackBar.open('Registration failed!', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
