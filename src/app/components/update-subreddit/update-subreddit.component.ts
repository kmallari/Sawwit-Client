import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubredditsService } from 'src/app/services/subreddits.service';

@Component({
  selector: 'app-update-subreddit',
  templateUrl: './update-subreddit.component.html',
  styleUrls: ['./update-subreddit.component.css'],
})
export class UpdateSubredditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _subredditService: SubredditsService,
    private _route: ActivatedRoute
  ) {
    this.updateSubredditForm = this.fb.group({
      description: new FormControl(''),
      icon: new FormControl(''),
    });
    this.subredditName = this._route.snapshot.params['subreddit'];
  }

  ngOnInit(): void {}

  updateSubredditForm: FormGroup;
  newIcon?: File;
  subredditName: string;

  // for clearing the file input
  @ViewChild('fileInput', { static: false })
  InputVar?: ElementRef;

  onFileChange = (event: any) => {
    this.newIcon = event.target.files.item(0);
  };

  updateSubreddit = (form: FormGroup) => {
    interface Fields {
      description?: string;
      icon?: File;
    }

    const fieldsToUpdate: Fields = {};

    if (form.value.description.length !== 0) {
      fieldsToUpdate['description'] = form.value.description;
    }
    if (this.newIcon) {
      fieldsToUpdate['icon'] = this.newIcon;
    }

    console.log(fieldsToUpdate);

    if (Object.keys(fieldsToUpdate).length !== 0) {
      this._subredditService
        .updateSubreddit(this.subredditName, fieldsToUpdate)
        .subscribe((data) => {
          form.reset();
          this.resetFileInput();
          console.log(data);
        });
    }
  };

  resetFileInput() {
    if (this.InputVar) this.InputVar.nativeElement.value = '';
  }
}
