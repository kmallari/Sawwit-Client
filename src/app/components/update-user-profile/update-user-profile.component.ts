import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css'],
})
export class UpdateUserProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
    private _auth: AuthService
  ) {
    this.updateUserForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
      profilePicture: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  updateUserForm: FormGroup;
  newProfilePicture?: File;

  // for clearing the file input
  @ViewChild('fileInput', { static: false })
  InputVar?: ElementRef;

  onFileChange(event: any) {
    this.newProfilePicture = event.target.files.item(0);
  }

  updateUser = (form: FormGroup) => {
    interface Fields {
      email?: string;
      password?: string;
      profilePicture?: File;
    }

    const fieldsToUpdate: Fields = {};

    if (form.value.email.length !== 0) {
      fieldsToUpdate['email'] = form.value.email;
    }
    if (form.value.password.length !== 0) {
      fieldsToUpdate['password'] = form.value.password;
    }
    if (this.newProfilePicture) {
      fieldsToUpdate['profilePicture'] = this.newProfilePicture;
    }

    console.log(fieldsToUpdate);

    if (Object.keys(fieldsToUpdate).length !== 0) {
      if (this._auth.loggedInUser) {
        this._usersService
          .updateUser(this._auth.loggedInUser.id, fieldsToUpdate)
          .subscribe((res: any) => {
            form.reset();
            this.resetFileInput();
            console.log(res);
          });
      }
    }
  };

  resetFileInput() {
    if (this.InputVar) this.InputVar.nativeElement.value = '';
  }
}
