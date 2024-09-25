// Angular Core & Material Design Imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {}
  title = 'moviemax-angular-client';

  // Ensure toolbar is not rendered on welcome screen
  showToolbar(): boolean {
    return this.router.url !== '/welcome';
  }
}
