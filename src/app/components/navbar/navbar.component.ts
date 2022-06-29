import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loginForm: boolean = false;
  signupForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showLoginForm = () => {
    this.loginForm = true;
  };

  showSignupForm = () => {
    this.signupForm = true;
  };

  closeLoginForm = () => {
    this.loginForm = false;
  };

  closeSignupForm = () => {
    this.signupForm = false;
  };
}
