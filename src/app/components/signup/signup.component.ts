import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  signupUser(form: FormGroup) {
    this.usersService
      .register(form.value.email, form.value.username, form.value.password)
      // sa subscribe pwede maglagay ng error handler
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        // error handling dito AND sa service
        (error) => {
          console.log(error);
        }
      );
  }
}
