import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = this._auth.isLogin;
  user?: User = this._auth.loggedInUser;

  constructor(private router: Router, private _auth: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // refreshes page on route change

    console.log(this.isLogin);
  }

  logout() {
    this._auth.clearStorage();
    this.router.navigate(['/']);
    window.location.reload();
  }

  ngOnInit(): void {}
}
