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
  isLogin: boolean = this._auth.isLogin;
  errorMessage: any;
  invalidLogin: boolean = false;
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
    // mutate din yung isLogin sa _auth service dito
    if (form.valid) {
      this.usersService
        .login(form.value.loginInfo, form.value.password)
        .subscribe(
          (res: any) => {
            // console.log('RESULT: ', res.token);
            console.log('res', res);
            if (res.token) {
              this._auth.setDataInCookies('userData', JSON.stringify(res.data));
              this._auth.setDataInCookies('token', res.token);
              // this._router.navigate(['']);
              window.location.reload();
            } else {
              this.invalidLogin = true;
            }
          },
          (err) => {
            console.error('ERROR!', err);
            this.invalidLogin = true;
          }
        );
    } else {
      console.log('no res');
      this.invalidLogin = true;
    }
  }

  logout() {
    // mutate din yung isLogin sa _auth service dito
    this._auth.clearStorage();
    this._router.navigate(['']);
  }

  setInvalidLogin() {
    if (this.invalidLogin) this.invalidLogin = false;
  }
}
