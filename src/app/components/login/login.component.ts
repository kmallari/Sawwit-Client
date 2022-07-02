import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean = false;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      loginInfo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  loginUser(form: FormGroup) {
    this.usersService
      .login(form.value.loginInfo, form.value.password)
      .subscribe((res: any) => {
        console.log('RESULT: ', res.token);
        if (res.token) {
          this._auth.setDataInCookies(
            'userData',
            JSON.stringify(res.data)
          );
          this._auth.setDataInCookies('token', res.token);
          this._router.navigate(['']);
          window.location.reload();
        }
      });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['']);
  }
}
