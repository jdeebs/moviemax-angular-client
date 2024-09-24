// Angular Core & Material Design Imports
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviemax-angular-client';
  // // Open the dialog when movie card is clicked
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px',
  //   });
  // }
}
