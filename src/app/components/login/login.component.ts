import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
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
        console.log(res);
      });
  }
}
