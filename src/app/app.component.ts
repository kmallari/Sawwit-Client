import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

// dito icheck yung islogin !!

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sawwit-client';

  constructor(private _auth: AuthService) {
    this._auth.getUserDetails();
    this._auth.isUserLoggedIn();
  }
}
