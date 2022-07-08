import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage: any;
  signupForm: FormGroup;
  invalidEmail: boolean = false;
  invalidUsername: boolean = false;
  invalidPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isUserLogin();
    // console.log(this.isLogin);
  }

  signupUser(form: FormGroup): void {
    if (!this.isValidEmail(form.value.email)) {
      this.invalidEmail = true;
    } else {
      this.invalidEmail = false;
    }
    if (!this.isValidUsername(form.value.username)) {
      this.invalidUsername = true;
    } else {
      this.invalidUsername = false;
    }
    if (!this.isValidPassword(form.value.password)) {
      this.invalidPassword = true;
    } else {
      this.invalidPassword = false;
    }

    if (!this.invalidEmail && !this.invalidUsername && !this.invalidPassword) {
      if (form.valid) {
        this.usersService
          .register(form.value.email, form.value.username, form.value.password)
          // sa subscribe pwede maglagay ng error handler
          .subscribe((res: any) => {
            if (res.token) {
              // console.log(res);
              this._auth.setDataInCookies('userData', JSON.stringify(res.data));
              this._auth.setDataInCookies('token', res.token);
              this._router.navigate(['/home']);
              window.location.reload();
            } else {
              // console.log(res);
              alert(res.msg);
            }
          });
      }
    } else {
      return;
    }
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  isValidUsername = (username: string) => {
    // username is 4-20 characters long
    // no _ at the beginning and end
    // no __* inside
    // only allows alphanumeric characters and _

    if (/^(?=[a-zA-Z0-9_]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username)) {
      return true;
    }
    return false;
  };

  isValidEmail = (email: string) => {
    console.log('TEST');
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  // function for  checking if password is valid using regex
  isValidPassword = (password: string) => {
    // password is 8-20 characters long
    // at least one uppercase letter
    // at least one lowercase letter
    // at least one number
    // at least one special character
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  };
}
